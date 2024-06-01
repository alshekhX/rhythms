
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./assets/base.css"
import "./assets/main.css"
import Icon from '@/directives/icon.js'

import {auth,firebase} from "./includes/firebase"
import i18n from '@/includes/i18n.js'
import GlobalComponents from '@/includes/_global.js'



import VeeValidationPlugin from "./includes/validation";
import { registerSW } from "virtual:pwa-register";

import App from './App.vue'
import router from './router'

//register workbox
registerSW({immediate:true})
let app;

auth.onAuthStateChanged(()=>{

if(!app){

 app = createApp(App)
 firebase.analytics;
 app.use(createPinia())
 app.use(router)
 app.use(VeeValidationPlugin)
 app.use(GlobalComponents)
 app.directive('icon',Icon)
 app.use(i18n);
 app.mount('#app')
 
}

})