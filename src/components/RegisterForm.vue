<template>
  <vee-form :initial-values="userData" class="py-5" :validation-schema="schema" @submit="register">
    <div class="text-white text-center font-bold p-4 mb-4" v-show="reg_alert_show" :class="reg_alert_variant">

      {{ reg_alert_msg }}
    </div>
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field type="text" name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name" />
      <ErrorMessage name="name" class="text-red-600" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field type="email" name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
      <ErrorMessage name="email" class="text-red-600" />

    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field name="age" type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" />
      <ErrorMessage name="age" class="text-red-600" />

    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field v-slot="{ field, errors }" type="password" name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password" :bails="false">
        <input type="password" v-bind="field"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password">
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}</div>
      </vee-field>
      <ErrorMessage name="password" class="text-red-600" />

    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field name="confirm_password" type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password" />
      <ErrorMessage name="confirm_password" class="text-red-600" />

    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field as="select" name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
      </vee-field>
      <ErrorMessage name="country" class="text-red-600" />

    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field name="tos" type="checkbox" value="1" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />

      <label class="inline-block">Accept terms of service</label>

    </div>
    <ErrorMessage name="tos" class="text-red-600" />


    <button type="submit" :disabled="reg_in_submission"
      class="block w-full bg-blue-600 text-white py-1.5 px-3 rounded transition hover:bg-blue-700">
      Submit
    </button>
  </vee-form>
</template>

<script>
import  useUserStore  from "@/stores/user.js";
import { mapActions } from "pinia";


export default {
  name: "RegisterForm",
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'email|required',
        age: "required|min_value:13|max_value:120",
        password: "required|min:4|max:10|excluded:password",
        confirm_password: "password_match:@password",
        country: "required",
        tos: "tos"
      },

      userData: {
        country: 'USA'
      },

      reg_in_submission: false,
      reg_alert_show: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait'

    }
  },
  computed:{

  },
  

  methods: {

    
...mapActions(useUserStore,{

createUser:"register"
}),
    async register(values) {
      this.reg_in_submission = true,
        this.reg_alert_show = true;


      try {
       await  this.createUser(values)
      }
      catch (e) {
        this.reg_in_submission = false,
          this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_msg = `${e}`;
        return;

      }

      
      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Your account is created successfully '
      window.location.reload();

    }

  },

}

</script>

<style lang="scss" scoped></style>