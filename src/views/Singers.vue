<template>
    <section class="bg-red-700 mb-14   pb-8">
      <div class="header-container m-auto container">
        <div class="  text-start font-bold sm:text-8xl  text-5xl whitespace-pre-line  mb-1 p-4 text-white">
          {{ $t("singers.main") }}

        </div>
        <p class=" text-xl font-semi sm:text-2xl xl:pt-8 px-4 mb-1 leading-relaxed  text-white  lg:w-5/6">
          {{ $t("singers.description") }}

        </p>
  
      </div>
  
    </section>
  
    <section>
      <div class=" container m-auto">
        <div class="px-6 pt-6 pb-5 font-bold border-t  border-r mx-4 mb-4 border-8 border-gray-700" 
        
        >
          <span class="card-title text-3xl">          {{ $t("singers.artists") }}
</span>
          <!-- Icon -->

        </div>
        <div class=" grid lg:grid-cols-2  ">
          <!-- <div class="author-card">
            <img src="https://i1.sndcdn.com/artworks-sqssnjIdDJ6DnajH-0py8Qg-t500x500.jpg" alt="">
            <p class="  text-black text-opacity-75">
              Wardi was born on 19 July 1932 in a small village called Sawarda close to Wadi Halfa in Northern Sudan. His
              mother, Batool Badri, died when he was an infant, and his father, Osman Hassan Wardi, died when he was nine
              years old.[1] He was brought up in a diverse and culturally rich background and developed an interest in
              poetry, literature, music and singing.[1] To complete his education, he moved to Shendi in Central Sudan, and
              returned to Wadi Halfa as a secondary school teacher.
  
            </p> -->
  
          <!-- </div> -->
         
          <singer-card v-for="singer in singers" :singer="singer"></singer-card>
        </div>
  
      </div>
  
  
    </section>
    <!-- <base-button></base-button> -->
  </template>
  
  <script>
  import SingerCard from "@/components/SingerCard.vue";
  import {singersCollection  } from "@/includes/firebase.js";
  export default {

    components:{SingerCard},
    data(){
        return{

            singers:[],
            maxPerPage: 8,
      pendingRequest: false
        }
    },
     async created(){
await this.getSingers();
window.addEventListener('scroll',this.handleScroll)


     },
     methods:{
        async handleScroll() {
      const { offsetHeight, scrollTop } = document.documentElement;
      const { innerHeight } = window;

      const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight - 1;

      if (bottomOfWindow) {
        console.log('hiii');
        await this.getSingers();
      }
    },
    async getSingers() {

if (this.pendingRequest == true) {
  return;
}

this.pendingRequest = true;

let snapshots;
if (this.singers.length) {
  const lastDoc = await singersCollection.doc(this.singers[this.singers.length - 1].id).get();

  snapshots = await singersCollection.orderBy('english_name').startAfter(lastDoc)
    .limit(this.maxPerPage)
    .get();


}
else {
  snapshots = await singersCollection.orderBy('english_name').limit(this.maxPerPage).get();

}
snapshots.forEach((doc) => {
  this.singers.push({
    id: doc.id,
    ...doc.data()
  })
})
this.pendingRequest = false;

}
     }

   


  }


</script>

  <style>
  
  .author-card {
  
  
    margin: 1rem;
  
  }
  
  .author-card img {
    margin: 0 1rem 1rem 0;
    width: 200px;
    float: left;
    /* Allow text to fill remaining space */
  
  
    height: 200px;
    /* Add margins for spacing */
  
  }
  
  .author-card p {
    text-align: justify;
  
  }
  
  @media (min-width: 1024px) {}</style>
  