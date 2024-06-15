<template>
    <section class="bg-red-700 mb-14   pb-8">
      <div class="header-container m-auto container">
        <div class="  text-start font-bold   sm:text-8xl  text-5xl whitespace-pre-line  mb-1 p-4 text-white">
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

<div
class="pb-10 pt-2 ">
<singers-search class=" px-4 " :search_label="search_label" v-on:search="handleSingerSearch" />
<div class="mx-4">

<template  v-for="singer in searchedSingers" :key="singer.id">
  <div v-show="searchedSingers.length!=0" class="border border-cyan-700   border-t-0 ">

  <router-link :to="{ name: 'singer', params: { id: singer.id } }">


  <div  class=" search-result cursor-pointer  px-4 py-1   bg-zinc-100 ">{{ $i18n.locale==='en'?singer.english_name :singer.arabic_name  }}   </div>
</router-link>
</div>


</template>  
</div>
</div>

        <div class="  transition grid lg:grid-cols-2  ">
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
  import SingersSearch from "@/components/Search.vue";
  import upperFirst from "lodash/upperFirst";


  export default {

    components:{SingerCard,SingersSearch},
    data(){
        return{

            singers:[],
            searchedSingers:[],
            maxPerPage: 8,
      pendingRequest: false
        }
    },
    computed:{
search_label(){
  return this.$i18n.locale=='en'?'Search name in english':'إبحث عن الأسم باللغة العربية';



},

      getSingerSearch(){

return this.$i18n.locale=='en'?'english_name':'arabic_name';

    }
    },
     async created(){
await this.getSingers();
window.addEventListener('scroll',this.handleScroll)


     },
     methods:{

      addSinger(doc) {
      const singers = {
        ...doc.data(),
        id: doc.id

      }
      this.singers.push(singers)

    },
      async handleSingerSearch(searchTerm) {
        if(!searchTerm.trim()){
          this.searchedSingers=[];
          return;
        }
     

      const startAt = upperFirst( searchTerm);
      const endAt = startAt + '\uf8ff'; // Append Unicode character with highest code point

      const singerSnapshot = await singersCollection.orderBy(this.getSingerSearch)
        .startAt(startAt)
        .endAt(endAt)

        .get();
      this.searchedSingers = [];

      singerSnapshot.forEach((doc)=>{
        const singer = {
        ...doc.data(),
        id: doc.id

      }
      this.searchedSingers.push(singer)




      });

      // Handle the search term received from the child component
      console.log('Search term:',);
      // Perform search actions here (e.g., API calls, filtering data)
    },


        async handleScroll() {
      const { offsetHeight, scrollTop } = document.documentElement;
      const { innerHeight } = window;

      const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight - 2;

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
snapshots.forEach(this.addSinger)
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
  
.search-result:hover{
  background-color:      rgb(14 116 144 );

  opacity: 80%;
  color: #ffff


}

  .author-card p {
    text-align: justify;
  
  }
  
  @media (min-width: 1024px) {}</style>
  