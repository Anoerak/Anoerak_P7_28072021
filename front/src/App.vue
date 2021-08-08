<template>
  <div id="app">
    <nav>    
      <Nav />
    </nav>
    <header>
      <Hero />
    </header>
    <router-view/>
  </div>
</template>


<script>
import Nav from './components/partials/Nav.vue'
import Hero from './components/partials/Hero.vue'

export default {
  components: {
    Nav, 
    Hero
  },
  
    beforeCreate() {
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.commit('CHECK_TOKEN');
  },
    created() {
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.dispatch('getInfos');
  },
  beforeMount() {
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.dispatch('getInfos');
    this.$store.commit('CHECK_TOKEN');
  },
  beforeUpdate() {
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.commit('CHECK_TOKEN');
  },
  updated() {
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.dispatch('getInfos');
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
