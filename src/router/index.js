import { createRouter, createWebHistory } from 'vue-router'

import useUserStores from '@/stores/user.js'

const Home = ()=>import('@/views/Home.vue');
const Song = ()=>import('@/views/Song.vue');
// const Manage = ()=>import('@/views/Manage.vue');
const About = ()=>import('@/views/About.vue');
const Singers = ()=>import('@/views/Singers.vue');
const Singer = ()=>import('@/views/Singer.vue');











const routes=[
  {path:"/",
  name:'home',
component:Home},

{path:"/about",
name:'about',
component:About},
{path:"/singers",
name:'singers',
component:Singers,},


{path:'/singers/:id',
name:"singer",
component:Singer
},

// {path:"/manage",
// name:'manage',
// meta:{requiresAuth:true},

// component:Manage},
{path:'/song/:id',
name:"song",
component:Song
},

{path:"/manage",
path:'/:catchAll(.*)*',
redirect:{name:'home'}},


];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    if(to.name=='song')
    return { top: 0 }
  },
  
  routes: routes ,
  
  linkExactActiveClass:'text-yellow-500'
})

router.beforeEach((to,from,next)=>{

if(!to.meta.requiresAuth){
  next();}
  const store= useUserStores();

  if(store.userLoggedIn){

    next();
  }else{

    next({name:"home"})
  }






})

export default router
