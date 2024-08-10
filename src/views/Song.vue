<template>
    <main>
        <div>

            <!-- Music Header -->
            <section class="w-full mb-8 pb-14 pt-6 text-center overflow-hidden text-white relative">

                <div class="absolute  inset-0 w-full z-10 h-full box-border bg-contain opacity-90 bg-red-700 music-bg">
                </div>
                <div class=" flex container  mx-auto flex-row  justify-start ">
                    <button @click="$router.back()"
                        class=" mx-auto container px-8 pb-8 flex justify-self-start btn btn-primary">
                        <i class=" z-50 text-2xl md:text-3xl fas fa-arrow-left text-white "></i>
                    </button>
                    <button @click="shareContent()"
                        class=" mx-auto   justify-end  lg:hidden  px-8 pb-8 flex  justify-items-end btn btn-primary">
                        
                        <i class=" z-50 text-xl md:text-2xl     fa fa-solid fa-retweet text-white " aria-label="share button" title="share"></i>
                    </button>
                </div>



                <div class="mx-auto container"> <img
                        class="     absolute  inset-0    left-2/4 overflow-hidden top-0 bottom-0        h-full    -z-40    box-border     "
                        :src="song.imageUrl ? song.imageUrl : tempImg" alt=""></div>

                <div class="container mx-auto px-4 flex items-center">

                    <!-- Play/Pause Button -->
                    <button type="button" @click.prevent="playSong()"
                        class="z-50 h-20 w-20 flex-none  lg:w-24 lg:h-24 border-white   lg:text-3xl text-xl bg-red-700 text-white border-8 border-red rounded-full focus:outline-none">
                        <i class="fas  " :class="toggole()"></i>
                    </button>
                    <div class="z-50 text-left ml-8">

                        <!-- Song Info -->
                        <div class="text-md pb- lg:text-2xl font-bold">{{ song.modefied_name }}</div>
                        


                        <router-link :to="{ name: 'singer', params: { id: song.singerID } }">
                            <div class="lg:text-xl  text-md pt-2"><span class="   font-medium ">{{ $t('artist') }}: </span>
                                <span class=" font-semibold underline"> {{ getSingerName }}</span></div>
                        </router-link>
                        <div v-show="song.source" class="  pt-4 inset-5 text-xs lg:text-lg font-bold"><a
                                :href="song.source">Song Source</a></div>

                    </div>
                </div>
            </section>
            <!-- Form -->
            <section class="container mx-auto mt-6">
                <div class="bg-white rounded border border-gray-200 relative flex flex-col">
                    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                        <!-- Comment Count -->
                        <span class="card-title">{{ $tc("song.comment_count", song.comments_count, {
                            count:
                                song.comments_count
                        }) }}</span>
                    </div>
                    
                    <div class="p-6">
                        <div :class="comment_alert_variant" class="text-white text-center font-bold p-4 mb-4"
                            v-if="comment_show_alert">
                            {{ comment_alert_message }}
                        </div>
                        <vee-form v-if="userLoggedIn" :validation-schema="schema" bails="false" @submit="addComment">
                            <vee-field as="textarea" name="comment"
                                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
                                :placeholder="$t('song.addComment')">

                            </vee-field>
                            <ErrorMessage name="comment" class="text-red-600" />

                            <button :disabled="comment_in_submission" type="submit"
                                class="py-1.5 px-3 rounded text-white bg-green-600 block">
                                {{ $t('song.submit') }}
                            </button>
                        </vee-form>
                        <!-- Sort Comments -->
                        <select v-model="sort"
                            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
                            <option value="1"> {{ $t('song.latest') }}</option>
                            <option value="2"> {{ $t('song.oldest') }}</option>
                        </select>
                    </div>
                </div>
            </section>
            <!-- Comments -->
            <ul class="container mx-auto">
                <li class="p-6 bg-gray-50 border border-gray-200" v-for="comment in sortedComments" :key="comment.id">
                    <!-- Comment Author -->
                    <div class="mb-5">
                        <div class="font-bold text-black opacity-90">{{ comment.name }}</div>
                        <div class="  text-sm  text-black opacity-75">{{ getCommentDate(comment.datePosted) }}</div>
                    </div>

                    <p>
                        {{ comment.content }}
                    </p>
                </li>

            </ul>
        </div>
    </main>
</template>

<script>
import { auth, songsCollection, commentsCollection } from "@/includes/firebase.js";
import { mapState, mapActions } from "pinia";
import useUserStore from "@/stores/user.js";
import usePlayerStore from "@/stores/player.js";
import { onBeforeRouteLeave } from "vue-router";





export default {
    name: "Song",
    created() {

    },

    data() {
        return {
            title: '',
            url: '',
            text: '',
            song: {},
            comments: [],
            sort: '1',
            schema: {
                comment: 'required|min:3'
            },
            comment_in_submission: false,
            comment_show_alert: false,
            comment_alert_variant: 'bg-blue-500',
            comment_alert_message: 'Please Wait! Your Comment is being submitted'
        }
    },
    async beforeRouteEnter(to, from, next) {

        const snapshot = await songsCollection.doc(to.params.id).get();

        next((vm) => {


            if (!snapshot.exists) {
                vm.$router.push({ name: 'home' });
                return;
            }

            const { sort } = vm.$route.params;

            vm.sort = sort === '1' || sort === "2" ? sort : '1';
            vm.song = {
                ...snapshot.data(),
                id: snapshot.id
            }
vm.title= 'Rhythms of Sudan';
vm.text= `${vm.song.modefied_name} (${vm.song.singer_arabic_name})`;
vm.url=`https://rhythmsofsudan.online/song/${vm.song.id}`;


            vm.getComments();
            


        })

    },

    computed: {


        getSingerName() {

            return this.$i18n.locale === 'en' ? this.song.singer_name : this.song.singer_arabic_name;
        },

        ...mapState(usePlayerStore, ['playing', 'current_song']),
        ...mapState(useUserStore, ["userLoggedIn"]),
        sortedComments() {
            return this.comments.slice().sort((a, b) => {
                if (this.sort === '1') {
                    return new Date(b.datePosted) - new Date(a.datePosted);
                }
                return new Date(a.datePosted) - new Date(b.datePosted);
            });
        }

    },

    methods: {
        async shareContent() {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: this.title,
                    
                        url: this.url,
                        text: this.text
                    });
                    console.log('Content shared successfully');
                } catch (error) {
                    console.error('Error sharing:', error);
                    // Fallback to other sharing methods if needed
                }
            } else {
                console.warn('Web Share API not supported');
                // Implement alternative sharing mechanisms
            }
        }
        ,
        ...mapActions(usePlayerStore, ['newSong', 'toggleSong']),
        getCommentDate(date) {
            console.log(date);
            return this.$i18n.d(new Date(date), 'long')


        },

        toggole() {

            if (this.playing && this.current_song.id == this.song.id) {
                return "fa-pause";
            }
            if (!this.playing && this.current_song.id == this.song.id) {
                return "fa-play";
            }

            return "fa-play";


        },
        async playSong() {

            if (this.current_song.id == this.song.id) {
                this.toggleSong();
            }
            else {

                this.newSong(this.song);
            }
        },
        ...mapActions(usePlayerStore, ['newSong']),
        async addComment(values, context) {
            this.comment_alert_message = this.$i18n.t('song.pleaseWait');
            this.comment_show_alert = true;
            this.comment_alert_variant = 'bg-blue-500';
            this.comment_in_submission = true;

            const comment = {
                content: values.comment,
                datePosted: new Date().toString(),
                sid: this.$route.params.id,
                name: auth.currentUser.displayName,
                uid: auth.currentUser.uid
            }
            await commentsCollection.add(comment);

            this.song.comments_count += 1;
            await songsCollection.doc(this.$route.params.id).update({
                comments_count: this.song.comments_count
            });
            this.comment_alert_message = this.$i18n.t('song.commentAdded');
            this.comment_alert_variant = 'bg-green-500';
            this.comment_in_submission = false;
            context.resetForm();
            this.getComments();
            setTimeout(() => {

                this.comment_show_alert = false;

            }, 3000)


        },
        async getComments() {
            const snapshot = await commentsCollection.where('sid', '==', this.$route.params.id).get();

            this.comments = [];
            snapshot.forEach((doc) => {
                this.comments.push({
                    id: doc.id,
                    ...doc.data(),
                })

            })

        }
    }
    , watch: {
        sort(newValue) {
            if (this.$route.query.sort === newValue) {
                return;
            }

            this.$router.push({ query: newValue })



        }
    }
}

</script>

<style lang="scss" scoped></style>