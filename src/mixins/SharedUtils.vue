<template>
</template>

<script>
import moment from "moment";
import RelativeDateType from "./DateTypes.js";

const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
}

export default {
  name: "SharedUtils",
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
    },

    progress: function () {
      let thresholdNumber = Number(this.threshold);
      let thresholdInMinutes = 60 * thresholdNumber;
      let progressNumber = this.calculateProgress(this.wannda, thresholdInMinutes, this.wielangweg);
      return progressNumber;
    },

    progressPercent: function () {
      return (Math.round(this.progress * 100)) + '%';
    },
  },
  methods: {
    uuidv4: function () {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
    uuidv5: function () {
      return 'blaaaav5';
    },
    formatRelativeDate(type, inputDate) {
      switch (type) {
        case RelativeDateType.Days:
          return this.relativeDateDays(inputDate);
          break;
        case RelativeDateType.Weeks:
          return this.relativeDateWeeks(inputDate);
          break;
        case RelativeDateType.Months:
          return this.relativeDateMonths(inputDate);
          break;
        case RelativeDateType.Full:
          return this.relativeDateFull(inputDate);
          break;
        case RelativeDateType.Rounded:
          return this.relativeDateRounded(inputDate);
          break;
        default:
          return this.relativeDateFull(inputDate);
          break;
      }
    },
    relativeDateDays(inputDate) {
      const now = moment().startOf("day");
      const date = moment(inputDate).startOf("day");
      var duration;
      if (date.isAfter(now)) {
        duration = moment.duration(date.diff(now));
      } else {
        duration = moment.duration(now.diff(date));
      }
      const days = Math.floor(duration.as("days"));

      const leftoverDuration = duration.subtract(days, "days");

      return days + " days ";
    },
    formattedDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("LL");
    },

    relativeDateWeeks: function (inputDate) {
      const now = moment().startOf("day");
      const date = moment(inputDate).startOf("day");
      var duration;
      if (date.isAfter(now)) {
        duration = moment.duration(date.diff(now));
      } else {
        duration = moment.duration(now.diff(date));
      }
      const weeks = Math.floor(duration.as("weeks"));

      const leftoverDuration = duration.subtract(weeks, "weeks");
      const days = Math.floor(leftoverDuration.as("d"));
      const daysString = days > 0 ? days + " days" : "";

      return weeks + " weeks " + daysString;
    },

    relativeDateMonths: function (inputDate) {
      let now = moment().startOf("day");
      let date = moment(inputDate).startOf("day");
      var duration;
      if (date.isAfter(now)) {
        duration = moment.duration(date.diff(now));
      } else {
        duration = moment.duration(now.diff(date));
      }
      let months = Math.floor(duration.as("months"));

      let leftoverDuration = duration.subtract(months, "months");
      let days = Math.floor(leftoverDuration.as("d"));
      let daysString = days > 0 ? days + " days" : "";

      return months + " months " + daysString;
    },

    relativeDateFull: function (inputDate) {
      const now = moment().startOf("day");
      const date = moment(inputDate).startOf("day");
      var duration;
      if (date.isAfter(now)) {
        duration = moment.duration(date.diff(now));
      } else {
        duration = moment.duration(now.diff(date));
      }
      const years = Math.floor(duration.as("years"));

      let leftoverDuration = duration.subtract(years, "years");

      const months = Math.floor(leftoverDuration.as("months"));
      const monthsString = months > 0 ? months + " months " : "";

      leftoverDuration = duration.subtract(months, "months");

      const days = Math.floor(leftoverDuration.as("days"));
      const daysString = days > 0 ? days + " days" : "";

      return years + " years " + monthsString + daysString;
    },

    relativeDateRounded: function (inputDate) {
      return moment(inputDate)
        .startOf("Day")
        .fromNow();
    },

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
    },
    calculateProgress: function (wanndaString, thresholdInMinutes, breakString) {

      let timeUntil = this.calculateTimeUntil(wanndaString, thresholdInMinutes, breakString);
      let now = this.jetzt;
      let minutesLeft = Math.abs(now.diff(timeUntil, 'minutes'));

      let timeWannda = moment.utc(wanndaString, 'HH:mm');
      let minutesDone = Math.abs(timeWannda.diff(now, 'minutes'));
      let progress = minutesDone / minutesLeft;

      return progress;
    }
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    // window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>
