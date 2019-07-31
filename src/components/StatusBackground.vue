<template>
<div class="wrapper">
  <div class="progressBar" v-if="showProgress">
    <div class="progress" :style="{height: progressHeight }"></div>
    <svg viewBox="0 342 1366 283">
    
      <!-- SVGs are "overflow: visible" by default.
           If we make this path extend vertically a long way, it will fill to the
           top of the SVG no matter how high the page is. -->
      <path id="wave" d="M0,342c595,0,813,283,1366,283 V -10000 H 0 Z"/>

    </svg>
  </div>
</div>
</template>

<script>
import moment from "moment";
import SharedUtils from '../mixins/SharedUtils';

export default {

  props: {
    wannda: String,
    wielangweg: String,
    threshold: Number,
    jetzt: Object,
    showProgress: Boolean,

  },

  mixins: [SharedUtils],
  data: function () {
    return {
      timeUntil: Object,
    }
  },
  components: {

  },
  computed: {
    progressHeight: function() {
      if (this.progress < 1) {
        return 'calc(' + this.progress*100 +'vh - 160px)';  
      } else {
        return '100vh';
      }
    }
  },
  methods: {
    
  },
}
</script>

<style lang="scss">


  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background: #eee
  }

  .progressBar {
    background: #efefef;
    color: #2d3e50;
    text-align: center;
    height: 1em;
    font-size: .3em;
    transition: all .2s ease-in-out;

    .progress {
      content: '';
      height: 1em;
      background: #76c9f5;
      display: block;
      position: relative;
    }
    #wave {fill: #76c9f5;}
  }




</style>
