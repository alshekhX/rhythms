
<template>
        <header id="header" class="bg-gray-700">
      <nav class="container mx-auto flex justify-start items-center py-5 px-4 ">
        <!-- App Name -->
        <router-link exact-active-class="no-ative" class="text-white font-bold uppercase text-2xl mr-4" :to="{name:'home'}"
          >RS</router-link
        >

        <ul class="  mobile-nav  flex-col " :class="{active:openNav}" >
            <!-- Navigation Links -->
            <li>
              <router-link class="px-3 text-white" :to="{name:'home'}">Home</router-link>
            </li>
           
            <li>
              <router-link class="px-3 text-white" :to="{name:'singers'}">Singers</router-link>
            </li>
            <li>
              <router-link class="px-3 text-white" :to="{name:'about'}">About</router-link>
            </li>
            <li v-if="!userStore.userLoggedIn">
              <a class="px-3 text-white" href="#"  @click.prevent="authValueToggle">Login / Register</a>
            </li>
            <template v-else>
              <li>
              <router-link class="px-3 text-white" :to="{name:'manage'}">Manage</router-link>
            </li>
            <li>
              <a class="px-3 text-white" href="#" @click.prevent="signOut()">Logout</a>
            </li>
            </template>
            <li><a class="px-3 text-white" href="#" @click.prevent="changeLocale">{{ currentLocale }}</a></li>

          </ul>

          <button class="ham-button" @click.prevent="openNav=!openNav" >
            <div>
            <i class="fas fa-bars  text-white  text-xl "></i> </div>
          </button>

        <div class="flex flex-grow items-center justify-center">

<!-- mobile navigation -->


          <!-- Primary Navigation -->
          <ul class="prime-nav flex flex-row mt-1">
            <!-- Navigation Links -->
            <li>
              <router-link class="px-3 text-white" :to="{name:'home'}">Home</router-link>
            </li>
           
            <li>
              <router-link class="px-3 text-white" :to="{name:'singers'}">Singers</router-link>
            </li>
            <li>
              <router-link class="px-3 text-white" :to="{name:'about'}">About</router-link>
            </li>
            <li v-if="!userStore.userLoggedIn">
              <a class="px-3 text-white" href="#"  @click.prevent="authValueToggle">Login / Register</a>
            </li>
            <template v-else>
              <li>
              <router-link class="px-3 text-white" :to="{name:'manage'}">Manage</router-link>
            </li>
            <li>
              <a class="px-3 text-white" href="#" @click.prevent="signOut()">Logout</a>
            </li>
            </template>
           
          </ul>
          
        </div>
        <ul class="locale-prime ml-auto">
            <li><a class="px-2 text-white" href="#" @click.prevent="changeLocale">{{ currentLocale }}</a></li>
          </ul>
      </nav>
    </header>

</template>

<script>

import { mapStores,mapActions } from "pinia";
import useModalStore from "../stores/modal";
import useUserStore from "../stores/user";

export default{
  data(){

return{
  openNav:false
}
  },

  computed:{
    ...mapStores(useModalStore,useUserStore),
    currentLocale(){
      return this.$i18n.locale==='en'?'English':'Arabic'
    }
 

  }
  ,methods:{

    ...mapActions(useUserStore,["signOut"]),
    authValueToggle(){
    this.modalStore.isOpen= !this.modalStore.isOpen;
    console.log(this.modalStore.isOpen);

  },
  changeLocale(){

    this.$i18n.locale= this.$i18n.locale==='en'?'ar':'en'
  },
 async signOut() {
await this.userStore.signOut();


if(this.$route.name==="manage"){
this.$router.push({name:'home'});
}

}}
}


</script>

<style  scoped>

.mobile-nav{

  display: none;
}

.ham-button{
display: none;
}


@media (max-width: 750px) {
  .prime-nav{
    display: none;
  }

  .locale-prime{
    display:none
  }
  
  
.ham-button{
display: block;
position: fixed;
z-index: 100;
right: 30px;
top: 20px;
}


.mobile-nav{

display: flex;
 align-items: end;

position: fixed;
padding-top: 100px;
top: 0;
right: -300px;
overflow: hidden;
height: 100%;
width: 250px;
z-index: 100;
background-color: brown;
transition: all 1s ease-in-out ;


}
.mobile-nav.active{

right: 0px;


}

.mobile-nav li{
padding-bottom: 20px;
padding-right: 40px;
justify-self: end

}
  
}
</style>