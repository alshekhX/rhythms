<script >
import AppHeader from './components/AppHeader.vue'
import AppAuth from './components/AppAuth.vue'
import AppPlayer from './components/player.vue'

import {auth} from '@/includes/firebase.js'
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user.js";


export default{

  name:"App"
  ,
  components:{AppHeader,AppAuth,AppPlayer},
  computed:{
    ...mapWritableState(useUserStore,['userLoggedIn'])
  },
  created(){

    if(auth.currentUser){

      this.userLoggedIn=true;
    }
  }
}
</script>

<template>
 <!-- Header -->
 <app-header>
  

 </app-header>

 <router-view  v-slot="{ Component}">
  
  <component :is="Component"></component>

 </router-view>
 
  <app-player/>

    <!-- Auth Modal -->
    <app-auth></app-auth>
   
</template>

<style>
.fade-enter-from{
opacity: 0;
}

.fade-enter-active{
  transition: all 0.3s linear;
}

.fade-leave-to{
opacity: 0;
transition: all 0.3s linear;

}
</style>