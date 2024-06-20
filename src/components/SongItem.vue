<template >
  <div v-show="song.imageUrl" class=" songs-center">
    <div class="flex flex-col  px-5    item-width    my-4 mr-5  cursor-pointer transition duration-300 hover:bg-red-50">
      <div class="">
        <router-link :to="{ name: 'song', params: { id: song.id } }" class="font-bold  text-gray-600">
        <img  class=" h-48 w-96     bg-contain "
          :src="song.imageUrl?song.imageUrl:tempImg"
          alt="">
          </router-link>
      </div>
      <div class=" flex flex-row   ">

        <i @click.prevent="playSong()" class="fas  text-gray-600  text-xl py-2 px-5  hover:text-blue-500 "  :class="toggole()"></i>

        <div class="flex flex-col px-1 py-2">
          <router-link :to="{ name: 'song', params: { id: song.id } }" class="font-bold  text-gray-600">{{ song.modefied_name
          }}</router-link>
          
    <router-link class=" " :to="{ name: 'singer', params: { id: song.singerID } }">          <div class="text-gray-500 text-sm  font-bold"><span class="text-sm">Artist: </span>{{ getSingerName }}</div>
</router-link>


        </div>
      </div>

      <!-- 
<router-link  :to="{ name:'song',params:{id:song.id},hash:'#comments'}"  custom v-slot="{navigate}" >         
            <div class="text-gray-600 text-lg" >
              <span class="comments" @click="navigate">
                <i class="fa fa-comments text-gray-600"></i>
                {{ song.commets_count }}
              </span>
            </div>
          </router-link>    -->
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from'pinia'
import usePlayerStore from "@/stores/player.js";

export default {
  name: 'SongItem',
  data(){
    return {
      tempImg:"https://yt3.googleusercontent.com/ytc/AIdro_nUx_j-MWdTAx96iZxEfItGLIIw4FTZHZufFHlVKbx_3OhB=s900-c-k-c0x00ffffff-no-rj"

  }
  },
  methods:{
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
  },},
  computed:{
    
    getSingerName(){

return this.$i18n.locale==='en'?this.song.singer_name :this.song.singer_arabic_name ;
},
    ...mapState(usePlayerStore,['playing','current_song'])

  },
  
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  


}
</script>

<style  scoped>
.item-width{
  max-width: 364px;
}
</style>