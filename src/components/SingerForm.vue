<template>
    <div>
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                <span class="card-title">Add Singer</span>
            </div>
            

            <vee-form @submit ="addUser" :validation-schema="singerSchema" class="p-6">
                <!-- names -->
                <div :class="alert_variant" class="text-white text-center font-bold p-4 mb-4" v-if="show_alert">
        {{ alert_message }}
      </div>

                <div class="mb-3">
                    <label class="inline-block mb-2">Name in English</label>
                    <vee-field name="english_name" type="text"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter name In english" />
                    <ErrorMessage name="english_name" class="text-red-600"/>

                </div>
                <!-- Password -->
                <div class="mb-3">
                    <label class="inline-block mb-2">Name in arabic</label>
                    <vee-field name="arabic_name" type="text"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter name in arabic" />
                    <ErrorMessage name="arabic_name" class="text-red-600"/>

                    <!-- Password -->
                    <div class="mb-3">
                        <label class="inline-block mb-2">Description in english</label>
                        <vee-field as="textarea" name="english_des" type="text"
                            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                            placeholder="Enter description in english" />
                        <ErrorMessage name="english_des" class="text-red-600"/>
                    </div>

                    <!-- Password -->
                    <div class="mb-3">
                        <label class="inline-block mb-2">Description in arabic</label>
                        <vee-field as="textarea" name="arabic_des" type="text"
                            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                            placeholder="Enter description in arabic" />
                        <ErrorMessage name="arabic_des" class="text-red-600"/>
                    </div>


                </div>
                <button  type="submit" :disabled="in_submission"
              class="block py-3  my-4 w-full bg-purple-600 self-center text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
              Add 
            </button>

            </vee-form>


        </div>

    </div>
</template>

<script>
import { mapActions } from "pinia";
import upperFirst from "lodash/upperFirst";
import UserSingerStore from "@/stores/singers.js"


export default {

    props:{

        addSingerToList:{
            type:Function,
            required:true
        }
    },

    


    data(){

        return{

            in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'Please wait! Updating song info. ',

            singerSchema:{
                english_name:'required',
                arabic_name:'required',
                english_des:'required',
                arabic_des:'required'


            }
        }
    },

    
    methods:{
async addUser(values){

    this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_message = 'Please wait! Updating song info.';
      let singerSnap = null;
      values.english_name= upperFirst(values.english_name);

    try{
        singerSnap= await this.addSinger(values);

    }
    catch(e){
        this.in_submission = false;
      this.show_alert = true;

        this.alert_variant = 'bg-red-500';
        this.alert_message = 'Something went wrong! Please try again.'
        console.log(e);
      
    }
    this.addSingerToList(singerSnap);
    this.alert_variant = 'bg-green-500';
      this.alert_message = 'Success.';
      this.in_submission = false;
      setTimeout(()=>{

this.show_alert=false;

      },3000)


},
...mapActions(UserSingerStore,['addSinger'])


    }
    

}
</script>

<style lang="scss" scoped></style>