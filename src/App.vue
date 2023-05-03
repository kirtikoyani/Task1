<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <CrudOperation/>
</template>

<script>
import CrudOperation from './components/CrudOperation.vue'

export default {
  name: 'App',
  components: {
    CrudOperation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  width:70%;
}
</style>
