<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-if="!showForm">
      
      <h4 class="inline-block text-2xl font-bold">{{ song.modefied_name }}</h4>
      <button @click.prevent="deleteSong" class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
        <i class="fa fa-times" ></i>
      </button>
      <button @click.prevent="showForm = !showForm"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-if="showForm">
      <div :class="alert_variant" class="text-white text-center font-bold p-4 mb-4" v-if="show_alert">
        {{ alert_message }}
      </div>
      <vee-form :initial-values="song" :validation-schema="schema" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">title</label>
          <vee-field @input="changeUpdatedFlag(true)" type="text" name="modefied_name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title" />
          <ErrorMessage name="modefied_name" class="text-red-600" />


        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field @input="changeUpdatedFlag(true)" type="text" name="genre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre" />
          <ErrorMessage name="genre" class="text-red-600" />


        </div>

        <div class="mb-3">
          <label class="inline-block mb-2">Singer</label>
          <vee-field as="select"  name="singerID"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Singer" >
            <option v-for="singer in singers" :value="singer.id">{{ singer.english_name }}</option>

            </vee-field>
          <ErrorMessage name="singerID" class="text-red-600" />

        </div>

        <input type="file"  id="image-change" accept="image/*" @change="uploadImage($event)">

        <div class=" w-52 pb-5" v-if="imgPreview"> <img :src="imgPreview" alt=""> </div>

        <button type="submit" :disabled="in_submission" class="py-1.5 px-3 rounded text-white bg-green-600">
          Submit
        </button>
        <button type="button" @click.prevent="showForm=false" :disabled="in_submission" class="py-1.5 px-3 mx-2 rounded text-white bg-orange-600">
          Go back
        </button>
       
      </vee-form>
    </div>


  </div>
</template>

<script>
import { songsCollection,storage } from "@/includes/firebase.js";
import { required } from "@vee-validate/rules";
export default {
  name: "comp-item",

  data() {
    return {
      showForm: false,
      imgPreview:null,
      schema: {
        modefied_name: 'required',
        singerID:'required',

        genre: 'required|min:3|max:30|alpha_spaces'
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'Please wait! Updating song info. '

    }
  },
  methods: {
async uploadImage($event){
const file = $event.target.files[0];

console.log(file);


const storageRef = storage.ref();
                const songsRef = storageRef.child(`/images/${file.name}`);
                const task = songsRef.put(file);
          task.on("state_change",(snapshot)=>{

            console.log("uploaded in progress");
          },
          
          (e)=>{
            console.log("uploaded in progress");



          },
          async ()=>{
            console.log("uploaded succefully");
            const imageUrl = await task.snapshot.ref.getDownloadURL();
            this.imgPreview=imageUrl;


            await songsCollection.doc(this.song.id).update({imageUrl});



          }
          )




},

    async edit(values) {
      console.log
      this.imgPreview=null;
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_message = 'Please wait! Updating song info.';


      try {
        const singerName= this.singers.find(singer=> singer.id===values.singerID).english_name;
console.log(singerName);
        const songInfo={
          singer_name:singerName
,
          ...values,
        }
        await songsCollection.doc(this.song.id).update(songInfo)
      } catch (error) {

        this.in_submission = false;
      this.show_alert = true;

        this.alert_variant = 'bg-red-500';
        this.alert_message = 'Something went wrong! Please try again.'
        return;

      }
      this.alert_variant = 'bg-green-500';
      this.alert_message = 'Success.';
      this.in_submission = false;
      console.log(this.id);
this.changeUpdatedFlag(false)
      this.updateSong(this.id,values)

    },

    async deleteSong(){
      console.log('fucl')
      const storageRef= storage.ref();
      const songRef= storageRef.child(`songs/${this.song.original_name}`);

      await songRef.delete();
      await songsCollection.doc(this.song.id).delete();
      this.removeSong(this.id);





    }
  },
  props: {
    changeUpdatedFlag:{
      type:Function
    },
    singers:{

      required:true
    },
    song: {
      type: Object,
      required: true
    },
    updateSong:{

      type:Function,
      required:true
    },
    removeSong:{
      type: Function,
      required:true
    },
    id:{
      type:Number,
      required:true
    }
  }
}
</script>

<style>
#image-change{

display: flex;


 background-color: #eee;
    padding: 15px;
    margin-bottom: 20px;
}
</style>