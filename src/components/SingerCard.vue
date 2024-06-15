<template>
  <div class="author-card ">
    <img :src='singer.imageUrl ? singer.imageUrl : "https://cdn-icons-png.flaticon.com/512/2919/2919906.png"'
      class=" w-32 h-32" alt="https://cdn-icons-png.flaticon.com/512/2919/2919906.png">
    <router-link class=" text-3xl font-bold  lg:text-start text-center  underline  opacity-90" :to="{ name: 'singer', params: { id: singer.id } }"> {{
      getSingerName }}</router-link>

    <p class="  py-5 text-black  text-opacity-75 w-full lg:w-5/6 font-semibold  text-xl  leading-relaxed">
      {{ trimSingerDes }} ...

      <router-link class=" text-lg font-bold  underline text-blue-700  opacity-90" :to="{ name: 'singer', params: { id: singer.id } }"> Read More</router-link>


    </p>

  </div>
</template>

<script>
export default {
  props: {
    singer: {
      type: Object,
      required: true
    }
  },
  computed:{

    getSingerName(){

      return this.$i18n.locale==='en'?this.singer.english_name :this.singer.arabic_name ;
    },

trimSingerDes(){
let description;

let local_des =this.$i18n.locale==='en'?this.singer.english_des :this.singer.arabic_des ;

  var words = local_des.split(" ");
  if(words.length>=80){
    
for (let i = 0; i < 80; i++) {
 
 description += words[i] + " ";

}


return description.replace("undefined","");

  }
  else{
    return local_des;
  }
}

  }
}
</script>

<style  scoped>
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


@media (max-width:650px) {



  .author-card {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }

  .author-card img {
    margin: 0 1rem 1rem 0;
    width: 200px;
    float: none;
    /* Allow text to fill remaining space */


    /* Add margins for spacing */

  }

  .author-card p {
    text-align: justify;
    font-size: 16px;

  }


}</style>