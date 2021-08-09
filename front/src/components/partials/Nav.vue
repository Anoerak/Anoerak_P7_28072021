<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a>
        <router-link class="navbar-item" to="/">
          <img src="../../../public/img/app_icons/icon.svg" alt="groupomania_logo_globe">
          <strong class="is-size-4">Groupomania</strong>
        </router-link>
      </a>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id='nav-menu' class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">
      <div class="navbar-start">
        <a class="navbar-item">
          <router-link to="/postsList" class="navbar-item" v-if="isLogged == true">Acceuil</router-link>
        </a>
        <a class="navbar-item">
          <router-link to="/about" class="navbar-item">À Propos</router-link>
        </a>
        <a class="navbar-item">
          <router-link to="/admin" class="navbar-item" v-if="privilegesS == 'admin'">Admin</router-link>
        </a>
      </div>
      <div class="button-block2" >
        <router-link class="button-block2" :to="'/userAccount'" v-if="isLogged == true">
          <button id="profilPicture" class="button is-xl is-dark" :style="{ 'background-image': 'url(' + profilPictureS + ')' }" ></button>
          <p>Profil</p>
        </router-link>
      </div>
    </div>
  </nav>
</template>


<script>
import { mapState } from 'vuex';

export default {
  name: 'Nav',
  el:'#app',
  data() {
    return {
      showNav: false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLogged; 
    }, 
    isValid(){
      return this.$store.state.isValid;
    },
    tokenToCheck() {
      return this.$store.state.tokenToCheck;
    },
    ...mapState([
        'tokenToCheck',
        'profilPictureS',
        'privilegesS',
        'isValid',
        'isLogged'
    ])
  },
}
</script>


<style lang="scss" scoped>
  nav {
    margin-top: 25px;
    margin-bottom: 30px;
    align-items: center;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.navbar-item{
        margin-right: 2rem;
      }
      &.router-link-exact-active {
        color: #FD2D00;
      }
    }
    & #nav-menu {
      & .button-block2{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        & .is-dark{
          width: 50px;
          height: 50px;
          border-radius: 100vw;
          background-position: center;
          background-size: cover;
          background-color: transparent;
          background-repeat: no-repeat;
        }
        & .is-xl{
          font-size: 0.75rem;
          color: black;
        }
        & p{
          color: black;
          font-size: 0.75rem;
        }
      }
    }
  }
  
</style>