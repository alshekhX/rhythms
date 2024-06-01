<template>
  <div class="fixed z-10   inset-0  overflow-y-auto" id="modal" :class="hiddenClass">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-center  sm:mb-0  m-auto bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">{{$t("auth.account")}}</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="modelVisibility = false">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center" @click.prevent="tab = 'login'">
              <a class="block rounded py-3 px-4 transition" :class="{
                'hover:text-white text-white bg-blue-600': tab === 'login',
                'hover:text-blue-600': tab === 'register'

              }" href="#">{{$t("auth.login")}}</a>
            </li>
            <li class="flex-auto text-center" @click.prevent="tab = 'register'">
              <a class="block rounded py-3 px-4 transition" href="#" :class="{
                'hover:text-white text-white bg-blue-600': tab === 'register',
                'hover:text-blue-600': tab === 'login'


              }">{{$t("auth.reg")}}</a>
            </li>
          </ul>


          <!-- Login Form -->

          <login-form v-if="tab === 'login'"></login-form>


         
           
          <!-- Registration Form -->
          <register-form v-else="tab === 'register'"></register-form>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script >

import { mapState, mapWritableState } from "pinia";
import UseModalStore from "../stores/modal";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";

export default {

  name: "AppAuth",
  components:{LoginForm,RegisterForm},
  data() {

    return {
      tab: 'login',
      schema: {

        name: 'required|min:3|max:100|alpha_spaces',
        email: 'email|required',
        age: "required|min_value:13|max_value:120",
        password: "required|min:4|max:10|excluded:password",
        confirm_password: "password_match:@password",
        country: "required",
        tos: "tos"
      },
      loginSchema: {

email: 'email|required',
password: "required|min:4|max:10|excluded:password",
},
      userData: {
        country: 'USA'
      },

      reg_in_submission:false,
      reg_alert_show:false,
      reg_alert_variant:'bg-blue-500',
      reg_alert_msg :'Please wait'

    }
  },

  methods: {
    register(values) {
     this. reg_in_submission=true,
      this.reg_alert_show=true;
      this.reg_alert_variant='bg-green-500';
      this.reg_alert_msg ='Your account is created successfully  '




    }

  },
  computed: {
    ...mapState(UseModalStore, ["hiddenClass"]),
    ...mapWritableState(UseModalStore, {

      "modelVisibility": "isOpen"
    })



  }

}
</script>

<style lang="scss" scoped></style>