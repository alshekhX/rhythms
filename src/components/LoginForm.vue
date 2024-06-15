<template>
   <vee-form  @submit="login"  class="py-5" :validation-schema="loginSchema" bails="false" >
    <div class="text-white text-center font-bold p-4 mb-4" v-show="log_alert_show" :class="log_alert_variant" >{{ log_alert_msg }}</div>

            <!-- Email -->

            <div class="mb-3">
              <label class="inline-block mb-2">{{ $t("auth.email") }}</label>
              <vee-field name="email" type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                :placeholder='$t("auth.enterEmail")' />
                <ErrorMessage name="email" class="text-red-600" />

            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">{{ $t("auth.password") }}</label>
              <vee-field name="password" type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                :placeholder='$t("auth.enterPass")' />
                <ErrorMessage name="password" class="text-red-600" />

            </div>
            <button type="submit" :disabled="log_in_submission" 
              class="block w-full   bg-blue-600 text-white py-1.5 px-3 rounded transition hover:bg-blue-700">
              {{ $t("auth.submit") }}
            </button>
          </vee-form>

</template>

<script>

import {mapActions  } from "pinia";
import useUserStore from "@/stores/user.js";
export default{
    

    
  name: "LoginForm",
  data() {

return {
 
  loginSchema: {

email: 'email|required',
password: "required|min:4|max:10|excluded:password",
},

  log_in_submission:false,
  log_alert_show:false,
  log_alert_variant:'bg-blue-500',
  log_alert_msg :'Please wait,We are logging you in'

}
},

methods: {
  ...mapActions(useUserStore,["authenticate"]),
async login(values) {
 this. log_in_submission=true,
  this.log_alert_show=true;
  this.log_alert_variant='bg-blue-500';
  this.log_alert_msg =this.$i18n.t("auth.loginWait");

  try{


  await this.authenticate(values);

  } catch(e){
 this. log_in_submission=false;
 this.log_alert_variant='bg-red-500';
  this.log_alert_msg =this.$i18n.t("auth.loginWrong");
  setTimeout(()=>{

this.log_alert_show=false;

      },4000)
  return;


     
  }
  this.log_alert_variant='bg-green-500';
  this.log_alert_msg =this.$i18n.t("auth.loginSuccess");
  window.location.reload();



}

},
}
</script>

<style lang="scss" scoped>

</style>