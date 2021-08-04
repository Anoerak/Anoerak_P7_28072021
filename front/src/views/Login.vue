<template>
    <section class="hero2 is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
              <div class="column is-6 is-offset-3" v-if="loggedIn">
                    <h3 class="title has-text-black">Vous êtes connecté en tant que {{ username }}</h3>
                      <button class="button is-danger is-outlined" @click.prevent="logout">
                        <span>Se Déconnecter</span>
                      </button>
              </div>
                <div class="column is-6 is-offset-3" v-if="!loggedIn">
                    <h3 class="title has-text-black">Connexion</h3>
                    <div class="box">
                        <figure class="profilPicture">
                            <img src="../../public/img/app_icons/user-regular.svg">
                            <div :class="{'help is-danger': isAlert, 'help is-success': !isAlert}" v-if="errorMessage != ''">{{ errorMessage }}</div>
                        </figure>
                        <form>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" id="username" type="text" placeholder="Pseudo" autofocus="" v-model="username" />
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" id="password" type="password" placeholder="Mot de Passe" v-model="password" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="checkbox">
                                    <input type="checkbox">
                                        Se Souvenir de moi
                                </label>
                            </div>
                            <button class="button is-block is-info is-large is-fullwidth" @click.prevent="login">Connexion <i class="fa fa-sign-in" aria-hidden="true"></i></button> <br>
                            <button class="button is-block is-primary is-normal is-fullwidth" @click="$router.push('/Register')">S'enregistrer <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a href="#">Mot de Passe oublié</a> &nbsp;·&nbsp;
                        <a href="#">Besoin d'aide</a>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .hero2{
        background-image: none;
        background-color: #FFF;
        & .box{
            border-radius: 10px;
            & .profilPicture{
                & img{
                    max-width: 5rem;
                }
            }
        }
    }

</style>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import axios from 'axios'

export default {

  name: 'Home',
  data() {
    return {
      v$: useVuelidate(),
      username: '', 
      test: this.$localStorage.get('token'), 
      password: '', 
      errorMessage:'',
      token: '',
      isAlert: false,
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
    }
  },
  methods: {
    login() {
      let user = {
        username: this.username,
        password: this.password
      }
      axios.post('http://localhost:3000/user/login/', user)
        .then(res => {
          this.errorMessage = res.data.message;
          this.$localStorage.set('token', res.data.token);
          this.$localStorage.set('userId', res.data.userId);
          this.$store.state.tokenToCheck = res.data.token;
          this.$store.state.userId = res.data.userId;
          this.isAlert = false;
          this.$store.dispatch('getInfos');
          this.$router.push('PostsList');
        })
        .catch(error => { 
          console.log(error);
          this.errorMessage = error.response.data.message;
          this.isAlert = true;  
          });
    },
    logout() {
    this.$localStorage.clear();
    this.$store.commit('LOGOUT');
    this.$store.commit('CLEAR_STATE');
    this.$router.push('');
  },
  }, 
  validations () {
    return{
        username: {
          required,
          minLength: minLength(3),
          syntaxe: value => {
            return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
        },
        password: {
          required,
          minLength: minLength(2),
          syntaxe: value => {
            return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
          }
        }
      }
    }
  }
}

</script>
