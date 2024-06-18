<script >
import { songsCollection } from "@/includes/firebase";
import AppSongItem from "@/components/SongItem.vue";
import AdGoogle from "@/components/AdGoogle.vue";




export default {
  name:'home',
  components: {
    AppSongItem,
    AdGoogle
  },
  data() {
    return {
      loading:true,
      songs: [],
      maxPerPage: 8,
      pendingRequest: false
    }
  },
  async created() {
    await this.getSongs();

    window.addEventListener('scroll', this.handleScroll)

  }
  ,
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }


  , methods: {
    async handleScroll() {
      const { offsetHeight, scrollTop } = document.documentElement;
      const { innerHeight } = window;

      const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight - 2;

      if (bottomOfWindow) {
        console.log('hiii');
        await this.getSongs();
      }
    },
    async getSongs() {

      if (this.pendingRequest == true) {
        return;
      }
      this.loading=true;

      this.pendingRequest = true;

      let snapshots;
      if (this.songs.length) {
        const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].id).get();

        snapshots = await songsCollection.orderBy('modefied_name').startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();


      }
      else {
        snapshots = await songsCollection.orderBy('modefied_name').limit(this.maxPerPage).get();

      }
      snapshots.forEach((doc) => {
        this.songs.push({
          id: doc.id,
          ...doc.data()
        })
      })
      this.pendingRequest = false;
      this.loading=false;


    }
  }
}

</script>

<template>
  <main>
    <!-- Introduction -->
    <section class="mb-12    text-white text-center relative bg-red-700">

      <div class="container mx-auto header-container   ">
        <div class="text-white main-header-content flex flex-col justify-self-start">
          <!-- <h1 class="font-bold text-5xl mb-1 px-4">{{ $t("home.listen") }}</h1> -->
          <h1 class=" text-start font-bold sm:text-8xl text-6xl  mb-1 p-4">Rhythms<br>Of Sudan</h1>

          <p class="w-full text-2xl text-start mb-4 pb-2  mx-auto px-4  whitespace-pre-line">
            {{ $t("home.description") }}
          </p>
        </div>
        <div><img src="/assets/img/singers/collage.jpg" class="     object-fill" alt=""></div>
        <!-- <div class=" max-w-64 flex flex-col  align-top ">
          <div class="flex max-h-60   flex-row"> <img class=" h-full  max-w-36"
              src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Ibn_Al_Badiya_1980s.jpg" alt=""> <img
              class=" h-full  w-36" src="https://alsudan.weebly.com/uploads/9/7/9/4/9794005/7661252.jpg" alt="">
           
              <img
              class=" h-full  w-36" src="https://i1.sndcdn.com/artworks-000170851819-9udy4t-t500x500.jpg" alt="">
          </div>
          <div class="  flex max-h-60  flex-row"> <img class=" h-full max-w-36"
              
          
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8_Fj9ZBon-8Ckw5ZNKfYa0S9AOI-wHof2kJ6hEqL6bQ&s" alt="">
              <img
              class=" h-full  w-36" src="https://i.pinimg.com/236x/85/3d/bb/853dbb63e4c0ce80e72bd19156b0d7f6.jpg" alt="">
              <img
              class=" h-full  w-36" src="https://alsudan.weebly.com/uploads/9/7/9/4/9794005/6357153.jpg" alt="">
          </div>

        </div> -->
      </div>

    </section>

    <!-- Main Content -->
    <section class="container  mx-auto ">
      <div class="relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-t border-r mb-4  mx-4 border-8 border-gray-700">
          <span class="card-title text-3xl">            {{ $t("home.songs") }}
</span>
          <!-- Icon -->

        </div>

        <!-- ads -->
        <ad-google></ad-google>
        <!-- Playlist -->
        <section class="container  items-center mx-auto">
          <div  id="playlist" class=" container songs-container  ">

            
            <app-song-item v-for="song in songs" :song="song" :key="song.id"  >

            </app-song-item>

           



          </div>
        
        </section>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>


<style  scoped>
.header-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));


}

@media (max-width:1300px) {

  .header-container {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));


  }

}


.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /* Three columns of equal width */
  grid-auto-flow: dense;
  /* Enables wrapping behavior */

  gap: 10px;
  /* Spacing between grid items */
}
</style>
