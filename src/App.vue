<template>
  <navbar />
<!-- <hii/> -->
  <router-view />
</template>

<script>
// import Hii from './components/hii.vue'
// import CrudOperation from './components/createUser.vue'
import navbar from './components/navBar.vue'

export default {
  name: 'App',
  components: {
    navbar,
    // Hii
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
