<template>
    <section class="hero2 is-success is-fullheight" v-if="loggedIn">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h3 class="title has-text-black">Modifier votre Profil</h3>
                    <div class="box">
                        <form class="profile_picture" action="">
                            <figure class="avatar">
                                <img src="../../public/img/app_icons/user-regular.svg">
                            </figure>
                            <div id="user_profilPicture" class="file is-info has-name">
                                <label class="file-label">
                                    <input class="file-input" type="file" name="resume" onchange="updateValue">
                                    <span class="file-cta">
                                    <i class="fas fa-upload"></i>
                                    <span class="file-label">
                                        Votre image…
                                    </span>
                                    </span>
                                    <span class="file-name">
                                        Aucun fichier
                                    </span>
                                </label>
                            </div>
                        </form>
                        <form>
                        <div class="columns row-one">
                            <div class="column is-three-fifths">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Prénom">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Nom">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns row-one">
                            <div class="column is-half">
                                <div class="control">
                                    <div class="input">
                                        <select>
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
                            <div class="column is-haf">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-normal" type="text" placeholder="Pseudo">
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" placeholder="Ancien Mot de Passe" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" placeholder="Nouveau Mot de Passe">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" placeholder="Confirmez votre Nouveau Mot de Passe">
                                </div>
                            </div>

                            <button class="button is-block is-success is-normal is-fullwidth">Valider <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
//  const fileInput = document.querySelector('#user_profilPicture input[type=file]');
//   fileInput.addEventListener("change", updateValue);
//   function updateValue() {
//     if (fileInput.files.length > 0) {
//       const fileName = document.querySelector('#user_profilPicture .file-name');
//       fileName.textContent = fileInput.files[0].name;
//     }
//   }

import useVuelidate from '@vuelidate/core'
import { required, sameAs } from '@vuelidate/validators'
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
            isAlert: true,
            isAlertPassword: false,
            feedbackMessagePassword: '',
            displayDeleteMessage: false,
            feedbackMessageProfilePicture: '',
            imgIsChecked: false, 
            img : {
                size: 0, 
                height: 0, 
                width: 0, 
                url: this.$store.state.profilePicture
            },
            typedCurrentPassword: '',
            newPassword:'', 
            confirmNewPassword:'',
            feedbackDeleteAccount: '',
            passwordDeleteAccount: '',
        }
    },
    validations () {
        return {
            typedCurrentPassword: {
            required,
            password_validation: {
                $validator: validPassword,
                $message: 'Votre mot de passe doit contenir au moins 6 caractères dont 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial'
                } 
            },
            newPassword: {
            required,
            password_validation: {
                $validator: validPassword,
                $message: 'Votre mot de passe doit contenir au moins 6 caractères dont 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial'
                } 
            },
            confirmNewPassword: {
            required,
            sameAsPassword: sameAs(this.newPassword)
            }
        }
    },
    methods: {
        checkImage() {
            let imageToCheck = this.$refs.file.files[0];
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

            if(!imageToCheck || imageToCheck.type.indexOf('image/') !== 0) {
                this.feedbackMessageProfilPicture = "Fichier non autorisé";
                this.isAlert = true; 
                this.imgIsChecked = false;
                return;
            }

            if(!allowedTypes.includes(imageToCheck.type)){
                this.feedbackMessageProfilePicture = "Veuillez choisir une image au format jpg, jpeg, png et gif"
                this.isAlert = true; 
                this.imgIsChecked = false; 
                return;
            }

            this.img.size = imageToCheck.size / 1000;

            if(this.img.size > 1000) {
                this.feedbackMessageProfilPicture = "Votre image depasse la taille autorisée (1Mo max)";
                this.isAlert = true; 
                this.imgIsChecked = false;
                return;
            }

            let fileReader = new FileReader(); 
            fileReader.readAsDataURL(imageToCheck);
            fileReader.onload = evt => {
                let image = new Image();
                image.onload = () => {
                    this.img.height = image.height;
                    this.img.width = image.width;
                    if(this.img.height > 300 || this.img.width > 300){
                        this.feedbackMessageProfilPicture = "Vérifier les dimensions de votre image (300x300)";
                        this.isAlert = true; 
                        this.imgIsChecked = false;
                        return;
                    }
                }
                image.src = evt.target.result;
            }

            this.imgIsChecked = true;
            this.feedbackMessage = ''; 
            this.isAlert = false;
            this.img.url = URL.createObjectURL(imageToCheck);
            return;
        },
        changeProfilPicture(){
            if(this.imgIsChecked) {
                let file = this.$refs.file.files[0];
                let formData = new FormData();
                formData.append("image", file);
                formData.append("userId", this.$store.state.userId);
                formData.append("profilePicture", this.$store.state.profilPicture);
                axios.put('http://localhost:3000/profile/profilePicture/', formData, { 
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }})
                .then(response => {
                    this.isAlert = false;
                    this.feedbackMessageProfilePicture = response.data.message;
                    this.img.size = 0;
                    this.img.height = 0; 
                    this.img.width = 0;
                    this.imgIsChecked = false;
                    this.$store.dispatch('getInfos');
                })
                .catch (error => {
                    console.log(error);
                })
            }
        },
        changePassword(){
            let passwordObject = {
                userId: this.$store.state.userId,
                currentPassword: this.typedCurrentPassword, 
                newPassword: this.newPassword
            }
            axios.put('http://localhost:3000/profile/changePassword/', passwordObject, { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                this.isAlertPassword = false;
                this.feedbackMessagePassword = response.data.message;
            })
            .catch(error => {
                this.isAlertPassword = true;
                this.feedbackMessagePassword = error.response.data.message;
            })
        },
        deleteAccount() {
            let dataDeleteAccount = {
                userId: this.$store.state.userId, 
                password: this.passwordDeleteAccount
            }
            axios.put('http://localhost:3000/profile/deleteAccount/', dataDeleteAccount, { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                this.feedbackDeleteAccount = response.data.message;
                this.isAlertDelete = false;
                this.$ls.clear();
                this.$store.commit('LOGOUT');
                this.$store.commit('CLEAR_STATE');
                this.$router.push('/');
            })
            .catch(error => {
                this.feedbackDeleteAccount = error.response.data.message;
                this.isAlertDelete = true;
                })
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
    }   
}
</script>

<style lang="scss" scoped>
    .profile_picture{
        display: flex;
        flex-direction: column;
        align-items: center;
        & .avatar{
            width: 40%;
        }
        & .file{
            margin: 1rem;
        }
    }
</style>