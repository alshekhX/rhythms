<template>
  <div id="ad-container"></div>
</template>
<script>

export default {
  name: 'AdComponent',
  async mounted() {
   await this.loadAd();
  },
  methods: {
   async loadAd() {
      let adContainer = document.getElementById('ad-container'); 

      let ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', 'ca-pub-7911677446308820');
      ins.setAttribute('data-ad-slot', '1835383620');
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
      adContainer.appendChild(ins);


      (adsbygoogle = window.adsbygoogle || []).push({});
    }
  }
}
</script>