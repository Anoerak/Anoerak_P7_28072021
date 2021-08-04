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
      console.log('beforeCreate : ', this.$store.state.username);
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.dispatch('getInfos');
    this.$store.commit('CHECK_TOKEN');
  },
    created() {
      console.log('created : ', this.$store.state.username);
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.dispatch('getInfos');
    this.$store.commit('CHECK_TOKEN');
  },
  beforeMount() {
      console.log('beforeMount : ', this.$store.state.username);
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.dispatch('getInfos');
    this.$store.commit('CHECK_TOKEN');
  },
  beforeUpdate() {
      console.log('beforeUpdate : ', this.$store.state.username);
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.dispatch('getInfos');
    this.$store.commit('CHECK_TOKEN');
  },
  updated() {
      console.log('updated : ', this.$store.state.username);
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.dispatch('getInfos');
    this.$store.commit('CHECK_TOKEN');
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
