<template>
  <div id="app">
    <navbar-section />

    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/views/Navbar.vue';

export default {
  components: {
    "navbar-section": Navbar,
  },
  data() {
    return {
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
