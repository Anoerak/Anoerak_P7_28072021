<template>
    <section class="hero2 is-success is-fullheight" v-if="!loggedIn">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h3 class="title has-text-black">Créer un Compte</h3>
                    <div class="box">
                        <figure class="avatar">
                            <img src="../../public/img/app_icons/user-regular.svg">
                            <div :class="{'alert-danger': isAlert, 'alert-success': !isAlert}" v-if="errorMessage != ''">{{ errorMessage }}</div>
                        </figure>
                        <form>
                        <div class="columns row-one">
                            <div class="column is-three-fifths">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Prénom" v-model="firstname" @blur="v$.firstname.$touch()">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Nom" v-model="lastname" @blur="v$.lastname.$touch()">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns row-one">
                            <div class="column is-half">
                                <div class="control">
                                    <div class="input">
                                        <select v-model="division" @blur="v$.division.$touch()">
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
                                        <input class="input is-normal" type="text" placeholder="Pseudo" v-model="username" @blur="v$.username.$touch()">
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div class="field">
                                <div class="control" :class="{invalid: v$.email.$error}">
                                    <input class="input is-normal" type="email" id="email" placeholder="Email" autofocus="" v-model="email" @blur="v$.email.$touch()">
                                    <span v-if="!v$.email.email" id="emailHelp" class="form-text">L'adresse email fournie est invalide. Merci de respecter le format xxx@xxx.xx</span>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control" :class="{invalid: v$.password.$error}">
                                    <input class="input is-normal" type="password" id="password" placeholder="Mot de Passe" v-model="password" @blur="v$.password.$touch()">
                                    <span v-if="!v$.password.minLength" id="emailHelp" class="form-text">Le mot de passe doit contenir au moins 6 caractères</span>
                                    <span v-if="!v$.password.syntaxe && password != ''" id="nomHelp" class="form-text">Le mot de passe contient des caractères non autorisés</span>

                                </div>
                            </div>

                            <div class="field">
                                <div class="control" :class="{invalid: v$.validation.$error}">
                                    <input class="input is-normal" type="password" id="validation" placeholder="Confirmez votre Mot de Passe" v-model="validation" @blur="v$.validation.$touch()">
                                    <span v-if="!v$.validation.passwordCheck && validation != ''" id="nomHelp" class="form-text">La confirmation n'est pas identique au mot de passe {{ v$.validation.syntaxe }}</span>
                                </div>
                            </div>

                            <button class="button is-block is-success is-large is-fullwidth" :disabled="v$.$invalid" @click.prevent="signUpUser">S'enregistrer <i class="fa fa-sign-in" aria-hidden="true"></i></button>
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
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import axios from 'axios'

export default {
  data() {
    return {
      v$: useVuelidate(),
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
  validations () {
    return {
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
            return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{5,}$/.test(value);
          }
      },
      validation () {
        return {
          required,
          passwordCheck: sameAs('password')
        }
      }
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
