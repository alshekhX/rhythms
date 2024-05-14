<template >
  <section class="bg-red-700  mb-12   overflow-hidden py-4">
    <div class="header-container mx-auto container">
      <div class="flex  flex-col justify-normal ">


        <div class="  text-start font-bold sm:text-8xl text-3xl md:text-5xl  xl:m-0 xl:pt-8 mx-auto p-4 mb-4 text-white">
          {{ singer.english_name }} </div>


      </div>
      <img :src="singer.imageUrl" class="mb-4 mx-auto xl:m-0 xl:pt-8 " alt="">

      <p class=" text-md font-semi sm:text-2xl  leading-relaxed  xl:m-0 lg:pb-8 text-justify lg:p-4 mx-auto mb-4 text-white w-3/4">
        {{ singer.english_des }}
      </p>


    </div>
  </section>

  <section>

    <div class=" m-auto container">
      <div class="px-6 pt-6 pb-5 font-bold border-t border-r mb-4  mx-4 border-8 border-gray-700" 
        
        >
          <span class="card-title text-3xl">Songs</span>
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
  }
  ,
  async created() {
    const id = this.$route.params.id;
    this.singer = await this.getSingerById(id);
    this.songs = await this.getSingerSongs(id)

  },
  methods: {
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
  