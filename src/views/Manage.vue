<template>
  <div>

    <section class=" container m-auto flex justify-center ">

      <!-- Tabs -->
      <ul class="flex flex-wrap mt-10 ">
        <li class="flex-auto text-center" @click.prevent="tab = 'song'">
          <a class="block rounded py-3 px-4 transition" :class="{
            'hover:text-white text-white bg-red-700': tab === 'song',
            'hover:text-blue-600': tab === 'song'

          }" href="#">{{ $t("manage.editSongs") }}</a>
        </li>
        <li class="flex-auto text-center" @click.prevent="tab = 'singer'">
          <a class="block rounded py-3 px-4 transition" href="#" :class="{
            'hover:text-white text-white bg-red-700': tab === 'singer',
            'hover:text-blue-600': tab === 'singer'


          }">{{ $t("manage.editSingers") }}</a>
        </li>
      </ul>

    </section>
    <!-- Main Content -->
    <section v-if="tab === 'song'" class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">

          <app-upload :addSong="addSong" />

        </div>
        <div class="col-span-2">
          <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">{{ $t("manage.mySongs") }} </span>
              <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
            </div>
            <manage-search v-on:search="handleSongsSearch" />

            <div class="p-6">
              <!-- Composition Items -->
              <comp-item :singers="singers" :changeUpdatedFlag="changeUpdatedFlag" :song="song" :id="i"
                :removeSong="removeSong" :updateSong="updateSong" v-for="(song, i) in songs" :key="song.id" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto mt-6" v-else>

      <div class="md:grid md:grid-cols-2 md:gap-4">
        <div class="col-span-1">
          <singer-form :addSingerToList="addSinger"></singer-form>
        </div>
        <div class="col-span-1">
          <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">{{ $t("manage.singers") }}</span>
              <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>

            </div>
            <manage-search v-on:search="handleSingerSearch" />

            <div class="p-6">
              <!-- Composition Items -->
              <singer-edit-item :changeUpdatedFlag="changeUpdatedFlag" :singer="singer" :id="i"
                :removeSinger="removeSinger" :updateSinger="updateSinger" :updateSingerPic="updateSingerPic"
                v-for="(singer, i) in singers" :key="singer.id" />
            </div>
          </div>
        </div>
      </div>








    </section>

  </div>
</template>

<script >
import AppUpload from "@/components/Upload.vue";
import CompItem from "@/components/compItem.vue";
import SingerForm from "@/components/SingerForm.vue";
import SingerEditItem from "@/components/SingerEditItem.vue";
import ManageSearch from "@/components/Search.vue";




import { auth, songsCollection, singersCollection, userCollection } from "@/includes/firebase.js";



// import useUserStore from "@/stores/user.js";
export default {
  name: "manage",
  data() {
    return {
      tab: 'song',

      songs: [],
      singers: [],
      updatedFlag: false,

    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.updatedFlag) {
      next();
    } else {

      const leave = confirm('are you sure you wont to leave');
      next(leave);
    }
  },
  computed:{
    getSingerSearch(){

return this.$i18n.locale=='en'?'english_name':'arabic_name';

    }

  },
  methods: {
    async handleSongsSearch(searchTerm) {
      if (!searchTerm.trim()) {

        const songsSnapshot = await songsCollection.get();


        songsSnapshot.forEach(this.addSong);
        return;
      }

      const startAt = searchTerm;
      const endAt = startAt + '\uf8ff'; // Append Unicode character with highest code point

      const songsSnapshot = await songsCollection.orderBy('modefied_name')
        .startAt(startAt)
        .endAt(endAt)

        .get();
      this.songs = [];

      songsSnapshot.forEach(this.addSong);

      // Handle the search term received from the child component
      console.log('Search term:',);
      // Perform search actions here (e.g., API calls, filtering data)
    }
    ,


    async handleSingerSearch(searchTerm) {
      if (!searchTerm.trim()) {

        const singerSnapshot = await singersCollection.get();


singerSnapshot.forEach(this.addSinger);

        return;
      }

      const startAt = searchTerm;
      const endAt = startAt + '\uf8ff'; // Append Unicode character with highest code point

      const singerSnapshot = await singersCollection.orderBy(this.getSingerSearch)
        .startAt(startAt)
        .endAt(endAt)

        .get();
      this.singers = [];

      singerSnapshot.forEach(this.addSinger);

      // Handle the search term received from the child component
      console.log('Search term:',);
      // Perform search actions here (e.g., API calls, filtering data)
    },

    changeUpdatedFlag(value) {

      this.updatedFlag = value;
    },

    addSong(doc) {
      const song = {
        ...doc.data(),
        id: doc.id

      }
      this.songs.push(song)

    },

    addSinger(doc) {
      const singers = {
        ...doc.data(),
        id: doc.id

      }
      this.singers.push(singers)

    },




    updateSong(i, values) {
      console.log(values)
      console.log(i)
      this.songs[i].modefied_name = values.modefied_name;
      this.songs[i].genre = values.genre;
    },

    removeSong(i) {
      console.log(i);
      this.songs.splice(i, 1);

      console.log(this.songs);
    },

    removeSinger(i) {
      console.log(i);
      this.singers.splice(i, 1);

      console.log(this.singers);
    },



    updateSinger(i, values) {
      console.log(values)
      console.log(i)
      this.singers[i].english_name = values.english_name;
      this.singers[i].arabic_name = values.arabic_name;
      this.singers[i].english_des = values.english_des;
      this.singers[i].arabic_des = values.arabic_des;


    },

    updateSingerPic(i, imgUrl) {
      this.singers[i].imageUrl = imgUrl;

    }

  },




  components: { AppUpload, CompItem, SingerForm, SingerEditItem, ManageSearch },
  async created() {
    const songsSnapshot = await songsCollection.where("uid",'==',auth.currentUser.uid).get();
    const singerSnapshot = await singersCollection.get();


    songsSnapshot.forEach(this.addSong);
    singerSnapshot.forEach(this.addSinger);
  }

  // beforeRouteEnter(to,from,next){
  //     const store=useUserStore();

  // if(store.userLoggedIn){
  //     next()
  // }
  // else{
  // next({name:'home'})}
  // }

}

</script>

<style lang="scss" scoped></style>