<template>
    <section class="hero2 is-success is-fullheight" v-if="!loggedIn">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h3 class="title has-text-black">Créer un Compte</h3>
                    <div class="box">
                        <figure class="avatar">
                            <img src="../../public/img/app_icons/user-regular.svg">
                            <div :class="{'help is-danger': isAlert, 'help is-success': !isAlert}" v-if="errorMessage != ''">{{ errorMessage }}</div>
                        </figure>
                        <form >
                        <div class="columns row-one">
                            <div class="column is-three-fifths">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Prénom" v-model="v$.firstname.$model">
                                          <div class="input-errors" v-for="(error, index) of v$.firstname.$errors" :key="index">
                                            <div class="help is-danger">{{ error.$message }}</div>
                                          </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Nom" v-model="v$.lastname.$model">
                                        <div class="input-errors" v-for="(error, index) of v$.lastname.$errors" :key="index">
                                          <div class="help is-danger">{{ error.$message }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns row-one">
                            <div class="column is-half">
                                <div class="control">
                                    <div class="input">
                                        <select v-model="v$.division.$model">
                                            <option>-selection-</option>
                                            <option>Accueil</option>
                                            <option>Compta</option>
                                            <option>RH</option>
                                            <option>SAV</option>
                                            <option>Expédition</option>
                                            <option>Logistique</option>
                                            <option>Direction</option>
                                        </select>
                                        <div class="input-errors" v-for="(error, index) of v$.division.$errors" :key="index">
                                          <div class="help is-danger">{{ error.$message }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-half">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Pseudo" v-model="v$.username.$model">
                                        <div class="input-errors" v-for="(error, index) of v$.username.$errors" :key="index">
                                          <div class="help is-danger">{{ error.$message }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="email" id="email" placeholder="Email" autofocus="" v-model="v$.email.$model">
                                    <div class="input-errors" v-for="(error, index) of v$.email.$errors" :key="index">
                                      <div class="help is-danger">{{ error.$message }}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" id="password" placeholder="Mot de Passe" v-model="v$.password.$model">
                                    <div class="input-errors" v-for="(error, index) of v$.password.$errors" :key="index">
                                      <div class="help is-danger">{{ error.$message }}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" id="validation" placeholder="Confirmez votre Mot de Passe" v-model="v$.confirmPassword.$model">
                                    <div class="input-errors" v-for="(error, index) of v$.confirmPassword.$errors" :key="index">
                                      <div class="help is-danger">{{ error.$message }}</div>
                                    </div>
                                </div>
                            </div>

                            <button class="button is-block is-success is-large is-fullwidth" :disabled="v$.$invalid" @click.prevent="signUpUser">S'enregistrer <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                      <a @click="$router.push('/')">Se Connecter</a> &nbsp;·&nbsp;
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

export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)){
    return true;
  }
  return false;
}
export function validUsername(name) {
  let validUsernamePattern = new RegExp("^[a-z A-Z0-9-]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validUsernamePattern.test(name)){
    return true;
  }
  return false;
}
export function validPassword(name) {
  let validPasswordPattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$");
  if (validPasswordPattern.test(name)){
    return true;
  }
  return false;
}

export default {

  setup () {
    return { v$: useVuelidate () }
  },

  data() {
    return {
      username: '',
      email: '',
      firstname: '',
      lastname:'',
      division:'',
      password: '',
      confirmPassword: '',
      errorMessage: '', 
      isAlert: false
    }
  },

  validations () {
    return {
        lastname: {
          required,
          minLength: minLength(2),
          name_validation: {
              $validator: validName,
              $message: 'Nom invalide. Utiliser uniquement des lettres, tirets (-) et espaces'
            } 
        },
        firstname: {
          required,
          minLength: minLength(2),
          name_validation: {
            $validator: validName,
            $message: 'Prénom invalide. Utiliser uniquement des lettres, tirets (-) et espaces'
          } 
        },
        division: {
          required,
        },
        username: {
          required,
          minLength: minLength(2),
          name_validation: {
              $validator: validUsername,
              $message: 'Pseudo invalide. Caractères spéciaux interdits'
            } 
        },
        email: {
          required,
          email
        },
        password: {
          required,
          password_validation: {
              $validator: validPassword,
              $message: 'Votre mot de passe doit contenir au moins 6 caractères dont 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial'
            } 
        },
        confirmPassword: {
          required,
          sameAsPassword: sameAs(this.password)
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
            this.$router.push('/')
          }, 2000)
        })
        .catch(error => { 
          this.errorMessage = error.response.data.message;
          this.isAlert = true;  
          });
    }
  }
}
</script>
