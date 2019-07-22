<template>
<div id='app'>
  <h1>Wanda</h1>
  <WandaSet />
</div>
</template>

<script>
import WandaSet from "./components/WandaSet.vue";

export default {
  name: 'app',
  components: {
    WandaSet
  }
};
</script>

<style lang="scss">
#app {
  font-family: $fonts;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style lang="scss" scoped>
ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
