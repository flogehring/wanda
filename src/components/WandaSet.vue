<template>
<div class="disable-all">
  <form>
    <div class="row">
      <label for="wannda">
        Wann da?
        <input type="text" id="wannda" :value="wannda" @input="wanndaUpdated" />
      </label>
    </div>
    <div class="row">
      <label for="wielangweg">
        Wie lang weg?
        <input type="text" id="wielangweg" :value="wielangweg" @input="breakUpdated" />
      </label>
    </div>
  </form>
  <div class="table-wrapper">
    <ul>
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="6.0" :jetzt="this.now"/>
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="7.7" :jetzt="this.now" class="main"/>
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="8.0" :jetzt="this.now" />
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="9.0" :jetzt="this.now" />
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="10.0" :jetzt="this.now" />
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
import moment from "moment";
import ResultRow from "./ResultRow.vue";
import {
  mapGetters
} from "vuex";

export default {

  created: function() {

      this.forceRerender();
      this.timer = setInterval(this.forceRerender, 60000)

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
    ResultRow
  },
  computed: {},
  methods: {
    wanndaUpdated: function (context) {
      let value = context.target.value;
      this.wannda = value;
      this.persist();
    },
    breakUpdated: function (context) {
      let value = context.target.value;
      this.wielangweg = value;
      this.persist();
    },
    persist: function () {
      localStorage.wannda = this.wannda;
      localStorage.wielangweg = this.wielangweg;
    },
    forceRerender: function() {
      // Update something to force a refresh without overhead
      // https://michaelnthiessen.com/force-re-render
      this.now = new moment();

    }
  
  }
};
</script>

<style lang="scss">
$container-max-width: 18em;

body {
  font-size: 16px;
}

.disable-all{-webkit-touch-callout: none;  -webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}


form {
  margin: 0 auto;
  max-width: $container-max-width;
}

.table-wrapper {
  max-width: $container-max-width;
  width: 100%;
  margin: 0 auto;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

  }
}

.row {
  font-size: 1.5em;
  text-align: left;
  margin: 1em;

  label {
    display: block;
  }

  input[type="text"] {
    display: block;
    font-size: 1em;
  }
 
}

.presets {
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
