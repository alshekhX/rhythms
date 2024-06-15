<template >
  <section class="   bg-red-700  -mb-11  overflow-y-hidden  pb-8">
    <div class="header-container   mx-auto container">
      <div class="  whitespace-pre-line text-start font-bold sm:text-8xl text-6xl  xl:mb-14 p-4 text-white">
        {{ $t("about.main") }}
      </div>
      <div>
        <p class=" text-xl font-semi sm:text-2xl xl:pt-8 px-4 mb-1  leading-relaxed  text-white  lg:w-5/6">
          {{ $t("about.first_description") }}


        </p>

        <img class="   xl:hidden block w-80 mx-auto mt-8"
          src="https://static.vecteezy.com/system/resources/previews/012/987/029/original/hand-drawn-of-sudan-3d-map-png.png"
          alt="" srcset="">

      </div>




      <p class="mt-12 text-xl font-semi sm:text-2xl xl:pt-8 px-4 mb-1  leading-relaxed  text-white  lg:w-5/6">
        {{ $t("about.second_description") }}

      </p>
    
      <img class="  hidden xl:w-96 xl:block"
          src="https://static.vecteezy.com/system/resources/previews/012/987/029/original/hand-drawn-of-sudan-3d-map-png.png"
          alt="" srcset="">


    </div>
    

    <div class="mt-32 mb-28 container mx-auto grid  gap-y-10  p-4 grid-cols-2 lg:grid-cols-4 ">
        <img class="  h-56  object-contain  w-56"
          src="https://www5.0zz0.com/2017/06/26/18/203987009.jpg"
          alt="" srcset="">
          <img class="  h-56  object-contain w-56"
          src="https://pan-african-music.com/wp-content/uploads/2020/05/0ee12936-sharhabil-ahmed.jpg"
          alt="" srcset="">
          <img class="  h-56   pr-2 object-contain w-56"
          src="https://resalnews.com/wp-content/uploads/2021/07/FB_IMG_1625770031495-780x470.jpg"
          alt="" srcset="">
          <img class="  h-56  object-contain w-56"
          src="https://i1.sndcdn.com/artworks-GzGbRGCubI4hymOm-IF4ePw-t500x500.jpg"
          alt="" srcset="">
          
          
      </div>
      <div class=" mb-5 container mx-auto  flex justify-center" >
        
    <form action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="hosted_button_id" value="SCPMRD3B7MJWL" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" border="0" src="https://www.paypal.com/en_AE/i/scr/pixel.gif" width="1" height="1" />
</form>



      </div>
      
      <div class=" mb-20 container mx-auto text-xl   text-white  flex justify-center"><a href="mailto:theflowzoneee@gmail.com" class="gmail-icon-container">
  <i class="fa fa-envelope"></i>
</a></div>
      <div class=" mb-10 container mx-auto text-xl   text-white  flex justify-center">
       <h2>Copyright © 2024 The Flow Zone</h2> 

</div>

    



    <!-- 
    <div class="main-grid container  pt-24">


      <p class=" text-xl font-semi pt-24 text-white w-3/4">
        Dive into the vibrant world of Sudanese music legends, explores the lives and stories of the artists who
        shaped Sudan's musical landscape. Find out about their musical styles, their journeys, and the unforgettable songs
        they left behind. Whether you're a fan of Sudanese music or just discovering it, this is your chance to learn
        about these talented artists and the music they created.
      </p>



    </div> -->




  </section>
  <!-- <base-button></base-button> -->
</template>

<style>
.main-grid {
  display: grid;
  margin: auto;
  row-gap: 20px;
  column-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
}

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
