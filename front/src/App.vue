<template>
  <div id="app">
    <Nav />
    <Hero />
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
  beforeUpdate() {
      console.log('', this.$store.state.avatarUser);
    this.$store.state.tokenToCheck = this.$ls.get('token');
    this.$store.state.userId = this.$ls.get('userId');
    this.$store.commit('CHECK_TOKEN');
  },
    beforeCreate() {
      console.log('', this.$store.state.avatarUser);
    // this.$store.state.tokenToCheck = this.$ls.get('token');
    // this.$store.state.userId = this.$ls.get('userId');
    this.$store.dispatch('getInfos');
    this.$store.commit('CHECK_TOKEN');
  },
  beforeMount() {
      console.log('', this.$store.state.avatarUser);
    this.$store.dispatch('getInfos');
  },
  created() {
    console.log('', this.$store.state.avatarUser);
    console.log('');
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
