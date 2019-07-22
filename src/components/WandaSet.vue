<template>
<div>
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
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="6.0" />
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="7.7" />
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="8.0" />
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="9.0" />
      <ResultRow :wannda="this.wannda" :wielangweg="this.wielangweg" :threshold="10.0" />
    </ul>
  </div>
</div>
</template>

<script>
import Store from "../store/index.js";
import ResultRow from "./ResultRow.vue";
import {
  mapGetters
} from "vuex";

export default {
  data: function () {
    return {
      wannda: "08:00",
      wielangweg: "00:30"
    };
  },

  props: {},
  components: {
    ResultRow
  },
  computed: {},
  methods: {
    wanndaUpdated: function (context) {
      let value = context.target.value;

      this.wannda = value;
    },
    breakUpdated: function (context) {
      let value = context.target.value;
      this.wielangweg = value;
    },
  }
};
</script>

<style lang="scss">
$container-max-width: 18em;

body {
  font-size: 16px;
}

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
</style>
