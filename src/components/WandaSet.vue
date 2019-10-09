<template>
<div class="disable-all">
  <StatusBackground :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="7.7" :jetzt="this.now" :showProgress="true"/>
 
  <form>
  <h1>Wanda</h1>
    <div class="row">
      <label for="wannda">
        Wann da? 
        <input type="text" id="wannda" :value="wannda" @input="wanndaUpdated" @focus="selectAll"/>
      </label>
      <div class="buttonWrapper">
        <a @click="setTimeToNow" href="#" class="setToNowLink">Jetzt</a>
      </div>
    </div>
    <div class="row">
      <label for="wielangweg">
        Wie lang weg?
        <input type="text" id="wielangweg" :value="wielangweg" @input="breakUpdated" @focus="selectAll"/>
      </label>
    </div>
  </form>
  <div class="table-wrapper">
    <ul>
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="6.0" :jetzt="this.now"  :showProgress="true"/>
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="7.7" :jetzt="this.now"   :showProgress="true"/>
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="8.0" :jetzt="this.now"  class="main"  :showProgress="true"/>
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="9.0" :jetzt="this.now"  :showProgress="true"/>
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="10.0" :jetzt="this.now"  :showProgress="true"/>
    </ul>
  </div>

   <div class="presets">
    <a href="/06:10/00:30/">/06:10/00:30/</a>
    <a href="/07:30/00:45/">/07:30/00:45/</a>
    <a href="/08:30/00:30/">/08:30/00:30/</a>
    <a href="/">Reset</a>
  </div>
</div>
</template>

<script>
import Store from "../store/index.js";
import moment from 'moment';
import ResultRow from './ResultRow';
import StatusBackground from './StatusBackground';
import {
  mapGetters
} from "vuex";

export default {

  created: function() {

      this.timer = setInterval(this.forceRerender, 60000);

  },

  watch: {
    // call again the method if the route changes
    '$route': 'forceRerender'
  },

  data: function () {
    return {
      wannda: this.wanndaProp,
      wielangweg: this.wielangwegProp,
      now: new moment(),
    };
  },

  props: {
    wanndaProp: {
      type: String,
      default: '07:00',
    },
    wielangwegProp: {
      type: String,
      default: '00:33',
    }
  },
  mounted() {
    if (localStorage.wannda && this.$route.params.wanndaProp === undefined) {
      this.wannda = localStorage.wannda;
      
    }
    if (localStorage.wielangweg && this.$route.params.wielangwegProp === undefined) {
      this.wielangweg = localStorage.wielangweg;
    }
    if(this.$route.params.wanndaProp !== undefined) {
      this.persist();
    }
  },
  components: {
    ResultRow, StatusBackground
  },
  computed: {},
  methods: {
    wanndaUpdated: function () {
      let value = document.querySelector('#wannda').value;
      this.wannda = value;
      this.persist();
    },
    breakUpdated: function () {
      let value = document.querySelector('#wielangweg').value;
      this.wielangweg = value;
      this.persist();
    },
    selectAll: function (context) {
      let target = context.target;
      // target.setSelectionRange(0, target.value.length+1);
      target.select();
    },
    persist: function () {
      localStorage.wannda = this.wannda;
      localStorage.wielangweg = this.wielangweg;
    },
    forceRerender: function() {
      // Update something to force a refresh without overhead
      // https://michaelnthiessen.com/force-re-render
      this.now = moment();

    },

    setTimeToNow: function(context) {
      let wannda = document.querySelector('#wannda');
      let minutes = this.now.minutes().pad(2);
      let hour = this.now.hour().pad(2);

      wannda.value = hour+':'+minutes;
      this.wanndaUpdated();
      
    }
  
  }
};
</script>

<style lang="scss">
$container-max-width: 18em;

* {
  box-sizing: border-box;
}

body {
  font-size: 16px;
}

.disable-all{-webkit-touch-callout: none;  -webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}


form {
  position: relative;
  margin: 0 auto;
  max-width: $container-max-width;
  
}

.table-wrapper {
  position: relative;
  max-width: $container-max-width;
  width: 100%;
  margin: 0 auto;

  ul {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;

  }
}

.row {
  position: relative;
  font-size: 1.5em;
  text-align: left;
  margin: 1em;

  label {
    display: block;
  }

  input[type="text"] {
    display: block;
    font-size: 1em;
    width: 100%;
  }
 
}
.buttonWrapper {
  text-align: center;
  margin: .5em 0;
}
.setToNowLink {
      font-size: 0.7em;
    text-align: center;
    display: inline-block;
    background: #fff;
    color: #666;
    font-weight: bold;
    margin: 0 auto;
    padding: 0.3em 0.7em;
    border-radius: 0.6em;
    text-decoration: none;
    box-shadow: 0 2px 3px 0px #0000004f;
}

.presets {
  position: relative;
  margin-top: 4em;
  display: flex;
  flex-direction: column;
  max-width: 20em;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  a {
    display: inline-block;
    background: #666;
    color: #fff;
    padding: .4em 1em;
    font-weight: bold;
    text-decoration: none;
    border-radius: 1em;
    margin: .5em;
    font-size: 1.2em;

  }
}
</style>
