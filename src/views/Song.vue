<template>
    <main>
    <div>

        <!-- Music Header -->
        <section class="w-full mb-8 py-14 text-center text-white relative">
            <div class="absolute inset-0 w-full h-full box-border bg-contain bg-red-700 music-bg"
                ></div>
            <div class="container mx-auto px-4 flex items-center">
                <!-- Play/Pause Button -->
                <button type="button"  @click.prevent="playSong()" class="z-50 h-20 w-20 flex-none  lg:w-24 lg:h-24   lg:text-3xl text-xl bg-red-700 text-white border-8 border-red rounded-full focus:outline-none">
                    <i class="fas  " :class="toggole()"></i>
                </button>
                <div class="z-50 text-left ml-8">
                    <!-- Song Info -->
                    <div class="text-md lg:text-2xl font-bold">{{ song.modefied_name }}</div>
                    <div>{{ song.genre }}</div>
                </div>
            </div>
        </section>
        <!-- Form -->
        <section class="container mx-auto mt-6">
            <div class="bg-white rounded border border-gray-200 relative flex flex-col">
                <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                    <!-- Comment Count -->
                    <span class="card-title">{{ $tc("song.comment_count",{count: song.comments_count}) }}</span>
                    <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
                </div>
                <div class="p-6">
                    <div :class="comment_alert_variant" class="text-white text-center font-bold p-4 mb-4"
                        v-if="comment_show_alert">
                        {{ comment_alert_message }}
                    </div>
                    <vee-form v-if="userLoggedIn" :validation-schema="schema" bails="false" @submit="addComment">
                        <vee-field as="textarea" name="comment"
                            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
                            placeholder="Your comment here...">

                        </vee-field>
                        <ErrorMessage name="comment" class="text-red-600" />

                        <button :disabled="comment_in_submission" type="submit"
                            class="py-1.5 px-3 rounded text-white bg-green-600 block">
                            Submit
                        </button>
                    </vee-form>
                    <!-- Sort Comments -->
                    <select v-model="sort"
                        class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
                        <option value="1">Latest</option>
                        <option value="2">Oldest</option>
                    </select>
                </div>
            </div>
        </section>
        <!-- Comments -->
        <ul class="container mx-auto" id="comments" >
            <li class="p-6 bg-gray-50 border border-gray-200" v-for="comment in sortedComments" :key="comment.id">
                <!-- Comment Author -->
                <div class="mb-5">
                    <div class="font-bold">{{ comment.name }}</div>
                    <time>{{ comment.datePosted }}</time>
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
import { mapState ,mapActions} from "pinia";
import useUserStore from "@/stores/user.js";
import usePlayerStore from "@/stores/player.js";
import { onBeforeRouteLeave } from "vue-router";


export default {
    name: "Song",
    data() {
        return {
            song: {},
            comments: [],
            sort:'1',
            schema: {
                comment: 'required|min:3'
            },
            comment_in_submission: false,
            comment_show_alert: false,
            comment_alert_variant: 'bg-blue-500',
            comment_alert_message: 'Please Wait! Your Comment is being submitted'
        }
    },
    async beforeRouteEnter(to,from,next) {

        const snapshot = await songsCollection.doc(to.params.id).get();

next((vm)=>{
    

    if (!snapshot.exists) {
            vm.$router.push({ name: 'home' });
            return;
        }

        const {sort} = vm.$route.params;

        vm.sort= sort==='1' || sort==="2"?sort:'1';
        vm.song = {
            ...snapshot.data(),
            id: snapshot.id
        }
        vm.getComments();


})

    },
    computed:{
        ...mapState(usePlayerStore,['playing','current_song']),

...mapState(useUserStore,["userLoggedIn"]),
sortedComments(){
    return this.comments.slice().sort((a,b)=>{
        if(this.sort ==='1'){
            return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
    });
}

    },
    
    methods: {
        ...mapActions(usePlayerStore,['newSong','toggleSong']),

        toggole(){
      
      if(this.playing&&this.current_song.id==this.song.id){
        return "fa-pause";
      }
      if(!this.playing&&this.current_song.id==this.song.id){
        return "fa-play";
      }

      return "fa-play";


    },
    async playSong(){

if(this.current_song.id==this.song.id){
this.toggleSong();
    }
    else{

      this.newSong(this.song);
    }
  },
        ...mapActions(usePlayerStore,['newSong']),
        async addComment(values, context) {
            this.comment_alert_message = "Please Wait! Your Comment is being submitted";
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

            this.song.comments_count+= 1;
            await songsCollection.doc(this.$route.params.id).update({
             comments_count:this.song.comments_count 
            });
            this.comment_alert_message = "Comment Added!";
            this.comment_alert_variant = 'bg-green-500';
            this.comment_in_submission = false;
            context.resetForm();
            this.getComments();

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
    ,watch:{
        sort(newValue){
            if(this.$route.query.sort===newValue){
                return;
            }

            this.$router.push({query:newValue})

            

        }
    }
}

</script>

<style lang="scss" scoped></style>