<template >
  <section class="bg-red-700  mb-12   overflow-hidden py-4">
    <button @click="$router.back()" class=" mx-auto container px-8 pt-2 pb-4  md:pb-8 flex justify-self-start btn btn-primary">
    <i class=" text-2xl md:text-3xl fas fa-arrow-left text-white "></i> 
  </button>
    <div class="header-container mx-auto container">
      <div class="flex  flex-col justify-normal ">


        <div class="   underline   lg:text-start text-center font-bold sm:text-5xl text-3xl md:text-5xl  xl:m-0 xl:pt-8 mx-auto p-4 mb-4 text-white">
          {{getSingerName}} </div>


      </div>
      <img :src="singer.imageUrl" class="mb-4   mx-auto xl:m-0 xl:pt-8 " alt="">

      <div v-show="singer.arabic_name" v-on:click="scrollToTarget"  class=" text-yellow-400 text-lg    cursor-pointer md:hidden  text-center font-bold  mx-auto p-4  text-white">
         {{ $t('singer.goToSongs') }}  <i class="fas fa-arrow-down

pen_spark
"></i> </div>
      <p  class=" text-md font-semi  sm:text-2xl  whitespace-pre-line  sm:leading-normal  xl:m-0 lg:pb-8  lg:p-4 mx-auto mb-4 text-white w-3/4"   :class="{' text-justify  ' :$i18n.locale=='ar','  text-justify ':$i18n.locale=='en'}" >
       {{getSingerDes}}
      </p>


    </div>
  </section>

  <section>

    <div class=" m-auto container">
      <div class="px-6 pt-6 pb-5 font-bold border-t border-r mb-4  mx-4 border-8 border-gray-700" 
        
        >
          <span id="singer-song" class="card-title text-3xl">{{$t("song.songs")}}</span>
          <!-- Icon -->

        </div>

      <div class=" songs-container  ">

        <app-song-item v-for="song in songs" :song="song" :key="song.id">

        </app-song-item>



      </div>

    </div>
  </section>
  <!-- <base-button></base-button> -->
</template>


<script>
import useSingersStore from "@/stores/singers.js";
import { mapActions } from "pinia";
import AppSongItem from "@/components/SongItem.vue";


export default {
  components: { AppSongItem },
  data() {
    return {

      singer: {},
      songs: [],

    }
  },
  computed:{
    

    getSingerName(){

return this.$i18n.locale==='en'?this.singer.english_name :this.singer.arabic_name ;
},


getSingerDes(){

return this.$i18n.locale==='en'?this.singer.english_des :this.singer.arabic_des ;
},
  }
  ,
  async created() {
    const id = this.$route.params.id;
    this.singer = await this.getSingerById(id);
    this.songs = await this.getSingerSongs(id)

  },
  methods: {
    scrollToTarget() {
      const targetElement = document.getElementById('singer-song');
      targetElement.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
    },
    ...mapActions(useSingersStore, ['getSingerSongs', 'getSingerById'])
  }


}
</script>
  
<style>
.main-grid {
  display: grid;
  margin: auto;
  row-gap: 20px;
  column-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
}



@media (min-width: 1024px) {}
</style>
  