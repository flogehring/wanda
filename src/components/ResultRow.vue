<template>
<li class="result-row row">
  <span class="threshold">{{ this.threshold }}h</span>
  <span class="absoluteTime">{{ absoluteTime }}</span>
  <span class="relativeTime">{{ relativeTime }}</span>

</li>
</template>

<script>
import moment from "moment";

Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
}

export default {

  props: {
    wannda: String,
    wielangweg: String,
    threshold: Number,
    jetzt: Object,

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
      let thresholdNumber = Number(this.threshold);
      let thresholdInMinutes = 60 * thresholdNumber;
      return this.calculateAbsoluteTime(this.wannda, thresholdInMinutes, this.wielangweg)
    },
    relativeTime: function () {
      let thresholdNumber = Number(this.threshold);
      let thresholdInMinutes = 60 * thresholdNumber;
      return this.calculateRelativeTimeFromNow(this.wannda, thresholdInMinutes, this.wielangweg);
    }
  },
  methods: {
    calculateAbsoluteTime: function (wanndaString, thresholdInMinutes, breakString) {
      let timeUntil = this.calculateTimeUntil(wanndaString, thresholdInMinutes, breakString);
      return timeUntil.format('HH:mm');
    },
    calculateRelativeTimeFromNow: function (wanndaString, thresholdInMinutes, breakString) {
      let timeUntil = this.calculateTimeUntil(wanndaString, thresholdInMinutes, breakString);
      let now = this.jetzt;
      let isOverHours = timeUntil.isBefore(now);
      let minutes = Math.abs(now.diff(timeUntil, 'minutes'));
      let hours = Math.floor(minutes / 60);
      let leftoverMinutes = minutes - (hours * 60);
      let prefix = isOverHours ? '+ ' : 'noch ';
      return prefix + hours + ':' + leftoverMinutes.pad(2);
    },
    calculateTimeUntil: function (wanndaString, thresholdInMinutes, breakString) {
      let timeWannda = moment(wanndaString, 'HH:mm');
      let timeBreak = moment(breakString, 'HH:mm');
      const timeUntil = timeWannda
        .add(thresholdInMinutes, 'minutes')
        .add(timeBreak.hours(), 'hours')
        .add(timeBreak.minutes(), 'minutes');
      return timeUntil;
    }
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
  border-radius: 3px;
  border: 1px solid #e0e0e0;

  &.main {
    background: #fff;
    border-color: #075169;
    // box-shadow: 0 2px 4px 0px rgba(0,0,0,.4);
  }

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
</style>
