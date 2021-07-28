<template>
    <section class="hero2 is-success is-fullheight" v-if="!loggedIn">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h3 class="title has-text-black">Créer un Compte</h3>
                    <div class="box">
                        <figure class="avatar">
                            <img src="../../public/img/app_icons/user-regular.svg">
                        </figure>
                        <form>
                        <div class="columns row-one">
                            <div class="column is-three-fifths">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Prénom" v-model="firstname" @blur="$v.firstname.$touch()">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Nom" v-model="lastname" @blur="$v.lastname.$touch()">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns row-one">
                            <div class="column is-half">
                                <div class="control">
                                    <div class="input">
                                        <select v-model="division" @blur="$v.division.$touch()">
                                            <option>-selection-</option>
                                            <option>Accueil</option>
                                            <option>Compta</option>
                                            <option>RH</option>
                                            <option>SAV</option>
                                            <option>Expédition</option>
                                            <option>Logistique</option>
                                            <option>Direction</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-half">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Pseudo" v-model="username" @blur="$v.username.$touch()">
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="email" placeholder="Email" autofocus="" v-model="email" @blur="$v.email.$touch()">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" placeholder="Mot de Passe" v-model="password" @blur="$v.password.$touch()">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" placeholder="Confirmez votre Mot de Passe" v-model="validation" @blur="$v.validation.$touch()">
                                </div>
                            </div>

                            <button class="button is-block is-success is-large is-fullwidth">S'enregistrer <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        </form>
                    </div>
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
            & .avatar{
                & img{
                    max-width: 5rem;
                }
            }
        }
    }
</style>

<script>
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      email: '',
      firstname: '',
      lastname:'',
      division:'',
      password: '',
      validation: '',
      errorMessage: '', 
      isAlert: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    username: {
      required,
      minLength: minLength(2),
      syntaxe: value => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
      }
    },
    division: {
      required,
      minLength: minLength(2),
      syntaxe: value => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
      }
    },

    lastname: {
      required,
      minLength: minLength(2),
      syntaxe: value => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
      }
    },
      firstname: {
        required,
        minLength: minLength(2),
        syntaxe: value => {
          return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
        }
    },
      password: {
        required,
        minLength: minLength(2),
        syntaxe: value => {
          return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
        }
    },
    validation: {
      required,
      sameAsPassword: sameAs('password')
    }
  }, 
  methods: {
    signUpUser() {
        let user = {
        lastname: this.lastname,
        firstname: this.firstname,
        username: this.username,
        division: this.division,
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:3000/user/signup/', user)
        .then((response) => {
          this.errorMessage = response.data.message;
          this.isAlert = false;
          setTimeout(() => {
            this.$router.push({ path: '/' })  
          }, 2000)
        })
        .catch(error => { 
          this.errorMessage = error.response.data.message;
          this.isAlert = true;  
          });
    }
  }
};
</script>
