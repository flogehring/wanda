<template>
<li class="result-row row">
  <div class="values">
    <span class="threshold">{{ this.threshold }}h</span>
    <span class="absoluteTime">{{ absoluteTime }}</span>
    <span class="relativeTime">noch {{ relativeTime }}</span>
  </div>
  <div class="progressBar" v-if="showProgress">

    <div class="progress" :style="{width: progress * 100 +'%' }"></div>
    <span>{{ progressPercent }}</span>
  </div>
</li>
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

  },
  methods: {
  },
}
</script>

<style lang="scss">
.result-row {

  background: #ffffff94;
  border-radius: 3px;
  border: 1px solid #bbbbbb;
  overflow: hidden;

  &.main {
    background: #fff;
    border-color: #075169;
    // box-shadow: 0 2px 4px 0px rgba(0,0,0,.4);
  }

  .values {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0.6em;

    span {
      flex-shrink: 1;
      flex-grow: 2;
      // padding: .9em;
    }

    .threshold {
      font-weight: bold;
      width: 4em;
    }

    .absoluteTime {
      text-align: right;
    }

    .relativeTime {
      text-align: right;
      font-size: .8em;
      color: #aaa;
    }
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

    span {
      font-weight: bold;
      position: relative;
      display: block;
      width: 100%;
      margin-top: -1.1em;
      font-size: 0.7em;
      padding: 0;
      line-height: 1em;
      opacity: 0;
    }

  }

  &:hover {
    .progressBar {
      font-size: 1em;

      span {
        opacity: 1;
      }
    }
  }
}
</style>
