<template>
<li class="result-row row">
  <span class="threshold">{{ this.threshold }}h</span>
  <span class="absoluteTime">{{ absoluteTime }}</span>
  <span class="relativeTime">noch {{ relativeTime }}</span>
</li>
</template>

<script>
import moment from "moment";

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

export default {

  props: {
    wannda: String,
    wielangweg: String,
    threshold: Number,

  },
  data: function () {
    return {
      timeUntil: Object,
    }
  },
  components: {

  },
  computed: {
    absoluteTime: function () {
      return this.calculateAbsoluteTime(this.wannda, this.threshold, this.wielangweg)
    },
    relativeTime: function () {
      return this.calculateRelativeTimeFromNow();
    }
  },
  methods: {
    calculateAbsoluteTime: function (wanndaString, thresholdString, breakString) {
      let timeWannda = moment.utc(wanndaString, 'HH:mm');
      var timeThreshold = moment.utc(thresholdString, 'HH:mm');

      let timeBreak = moment.utc(breakString, 'HH:mm');
      let difference = timeWannda
        .add(timeThreshold.hours(), 'hours')
        .add(timeThreshold.minutes(), 'minutes')
        .add(timeBreak.hours(), 'hours')
        .add(timeBreak.minutes(), 'minutes');
      this.timeUntil = difference;
      return difference.format('HH:mm');
    },
    calculateRelativeTimeFromNow: function () {
      // return this.timeUntil.fromNow();
      let now = new moment();
      let minutes = now.diff(this.timeUntil, 'minutes');
      let hours = Math.floor(minutes / 60);
      let leftoverMinutes = minutes - (hours * 60);
      return hours.pad(2) + ':' + leftoverMinutes.pad(2);
    },
  },
}
</script>

<style lang="scss">
.result-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: #f3f3f3;
    padding: 0.6em;
    border-radius: 0.6em;
  span {
    flex-shrink: 1;
    flex-grow: 2;
    // padding: .9em;
  }
  .threshold { font-weight: bold; width: 4em;}
  .absoluteTime { text-align: right;}
  .relativeTime { 
    text-align: right; 
    font-size: .8em;
    color: #aaa;
  }
}
</style>
