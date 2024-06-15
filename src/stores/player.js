import { defineStore } from 'pinia'
import { Howl } from 'howler'
import helper from "@/includes/helper.js";


export default defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    seek:"00:00",
    duration:"00:00",
    playerProgress:'0%'
  }),
  actions: {
    async newSong(song) {
        if(this.sound instanceof Howl){
            this.sound.unload();
        }
      this.current_song = song
      this.sound = new Howl({
        src: [this.current_song.url],
      
        html5: true
      })
      this.sound.play()

      this.sound.on('play',()=>{
requestAnimationFrame(this.progress);

      })
    },
    toggleSong() {
      if (!this.sound.playing) {
        return; 
      }

      if (this.sound.playing()) {
        this.sound.pause()
      }

      else {
        this.sound.play()
      }
    },
   async updateSeek(event){
        if(!this.sound.playing){
            return;
        }
const {x, width} = event.currentTarget.getBoundingClientRect()
const clientX= event.clientX-x;
const precentage= clientX/width;
const seconds= this.sound.duration()*precentage;
  this.sound.seek(seconds);
 this.sound.once("seek", this.progress);

       
    },
     progress(){
      if(!this.sound.playing){
        return;
    }

        this.seek= helper.formatTime( this.sound.seek());
        this.duration= helper.formatTime( this.sound.duration()); 
        this.playerProgress= `${(this.sound.seek()/this.sound.duration())*100}%`

            requestAnimationFrame(this.progress);
        
    }
  },
  getters:{

    

    playing:(state)=>{

if(state.sound.playing){
    return state.sound.playing()
}

return false

    },
    isLoading:(state)=>{

      if(state.sound.loading){
        return state.sound.loading()
    }
    
    return false

    },


  }
})
