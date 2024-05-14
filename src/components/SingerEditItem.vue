<template>
    <div class="border border-gray-200 p-3 mb-4 rounded">
      <div v-if="!showForm">
    <img :src='singer.imageUrl? singer.imageUrl:"https://cdn-icons-png.flaticon.com/512/2919/2919906.png" ' class=" w-32 h-32" alt="https://cdn-icons-png.flaticon.com/512/2919/2919906.png">    
        <h4 class="inline-block text-md font-bold">{{ singer.english_name }}</h4>
        <button @click.prevent="deleteSinger" class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
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
        <vee-form :initial-values="singer" :validation-schema="schema" @submit="editSinger">
            <div class="mb-3">
                    <label class="inline-block mb-2">Name in English</label>
                    <vee-field  @input="changeUpdatedFlag(true)" name="english_name" type="text"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter name In english" />
                    <ErrorMessage name="english_name" class="text-red-600" />

                </div>
            <div class="mb-3">
                    <label class="inline-block mb-2">Name in arabic</label>
                    <vee-field  @input="changeUpdatedFlag(true)" name="arabic_name" type="text"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter name in arabic" />
                    <ErrorMessage name="arabic_name" class="text-red-600" />

                    <!-- Password -->
                    <div class="mb-3">
                        <label class="inline-block mb-2">Description in english</label>
                        <vee-field  @input="changeUpdatedFlag(true)" as="textarea" name="english_des" type="text"
                            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                            placeholder="Enter description in arabic" />
                        <ErrorMessage name="english_des" class="text-red-600" />
                    </div>

                    <!-- Password -->
                    <div class="mb-3">
                        <label class="inline-block mb-2">Description in arabic</label>
                        <vee-field  @input="changeUpdatedFlag(true)" as="textarea" name="arabic_des" type="text"
                            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                            placeholder="Enter description in arabic" />
                        <ErrorMessage name="arabic_des" class="text-red-600" />
                    </div>


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
  import { singersCollection,storage } from "@/includes/firebase.js";
  export default {
    name: "comp-item",
  
    data() {
      return {
        showForm: false,
        imgPreview:null,
        schema: {
            english_name:'required',
                arabic_name:'required',
                english_des:'required',
                arabic_des:'required'
        },
        in_submission: false,
        show_alert: false,
        alert_variant: 'bg-blue-500',
        alert_message: 'Please wait! Updating Singer info. '
  
      }
    },
    created(){
        console.log('kossmk')
console.log(`images/singers/${this.singer.image_location}`)
    },
    methods: {



  async uploadImage($event){
  const file = $event.target.files[0];
  
  console.log(file);
  
  
  const storageRef = storage.ref();
                  const SingersRef = storageRef.child(`/images/singers/${file.name}`);
                  const task = SingersRef.put(file);

                  

            task.on("state_change",(snapshot)=>{
              console.log("uploaded in progress");
            },

            (e)=>{
              console.log("uploaded in progress");
            },

            async ()=>{
              console.log("uploaded succefully");
              const imageUrl = await task.snapshot.ref.getDownloadURL();
              this.singer.image_location=file.name;
              this.imgPreview=imageUrl;
              await singersCollection.doc(this.singer.id).update({imageUrl,image_location:file.name});
              this.updateSingerPic(this.id,imageUrl);
            }
            )
  
  },
  
      async editSinger(values) {

        this.imgPreview=null;
        this.in_submission = true;
        this.show_alert = true;
        this.alert_variant = 'bg-blue-500';
        this.alert_message = 'Please wait! Updating Singer info.';
  
  
        try {
          await singersCollection.doc(this.singer.id).update(values)
        } catch (error) {
            console.log(error)
  
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
        this.updateSinger(this.id,values)
  
      },

      
  
      async deleteSinger(){
        console.log('fucl');
        if(this.singer.image_location){
        const storageRef= storage.ref();
        const SingerRef= storageRef.child(`images/singers/${this.singer.image_location}`);
                await SingerRef.delete();

        }
        await singersCollection.doc(this.singer.id).delete();
        this.removeSinger(this.id);
      }
    },
    props: {
      changeUpdatedFlag:{
        type:Function
      },
      updateSingerPic:{

        type:Function,
        required:true

      },
      singer: {
        type: Object,
        required: true
      },
      updateSinger:{
  
        type:Function,
        required:true
      },
      removeSinger:{
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