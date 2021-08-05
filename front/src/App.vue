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
      console.log('beforeCreate : ', this.$store.state.tokenToCheck);
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.commit('CHECK_TOKEN');
  },
    created() {
      console.log('created : ', this.$store.state.userId);
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.dispatch('getInfos');
  },
  beforeMount() {
      console.log('beforeMount : ', this.$store.state.usernameS);
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.dispatch('getInfos');
      console.log('beforeMount2 : ', this.$store.state.usernameS)
    this.$store.commit('CHECK_TOKEN');
  },
  beforeUpdate() {
      console.log('beforeUpdate : ', this.$store.state.usernameS);
    this.$store.state.tokenToCheck = this.$localStorage.get('token');
    this.$store.state.userId = this.$localStorage.get('userId');
    this.$store.commit('CHECK_TOKEN');
  },
  updated() {
      console.log('updated : ', this.$store.state.usernameS);
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
