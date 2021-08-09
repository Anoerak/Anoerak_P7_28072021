<template>
    <section class="hero2 is-success is-fullheight" v-if="loggedIn">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h3 class="title has-text-black">Modifier votre Profil</h3>
                    <div class="box">
                        <form class="profile_picture" action="">
                        <div :class="{'notification is-success is-light': !isAlert, 'notification is-danger is-light': isAlert}" v-if="feedbackMessageProfilPicture != ''"> {{ feedbackMessageProfilPicture }} </div>
                            <figure class="avatar">
                                <img :src="img.url">
                            </figure>
                            <div id="user_profilPicture" class="file is-info has-name">
                                <label class="file-label">
                                    <input class="file-input" type="file" ref="file" name="file" accept="image/*" @change="checkImage()" >
                                    <span class="file-cta">
                                    <i class="fas fa-upload"></i>
                                    <span class="file-label">
                                        Votre image…
                                    </span>
                                    </span>
                                    <span class="file-name">
                                        {{img.url}}
                                    </span>
                                </label>
                            </div>
                            <button class="button is-primary" :disabled="!imgIsChecked" @click.prevent="changeProfilPicture">Valider</button><br>
                        </form>
                        <form>
                        <div class="columns row-one" >
                            <div class="column is-three-fifths">
                                <div class="field">
                                    <div class="control">
                                        <span class="input is-normal" type="text" > {{ firstnameS }} </span>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <span class="input is-normal" type="text"> {{ lastnameS }} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns row-one">
                            <div class="column is-half">
                                <div class="control">
                                    <div class="input">
                                        <span> {{ divisionS}} </span>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-haf">
                                <div class="field">
                                    <div class="control">
                                        <span class="input is-normal" type="text"> {{ usernameS}} </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" placeholder="Ancien Mot de Passe" autofocus="" v-model="v$.typedCurrentPassword.$model">
                                    <div class="input-errors" v-for="(error, index) of v$.typedCurrentPassword.$errors" :key="index">
                                      <div class="help is-danger">{{ error.$message }}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" placeholder="Nouveau Mot de Passe" v-model="v$.newPassword.$model">
                                    <div class="input-errors" v-for="(error, index) of v$.newPassword.$errors" :key="index">
                                      <div class="help is-danger">{{ error.$message }}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-normal" type="password" placeholder="Confirmez votre Nouveau Mot de Passe" v-model="v$.confirmNewPassword.$model">
                                    <div class="input-errors" v-for="(error, index) of v$.confirmNewPassword.$errors" :key="index">
                                      <div class="help is-danger">{{ error.$message }}</div>
                                    </div>
                                </div>
                            </div>
                            <div :class="{'notification is-danger is-light': isAlertPassword, 'notification is-success is-light': !isAlertPassword}" v-if="feedbackMessagePassword != ''"> {{ feedbackMessagePassword }} </div>
                            <button class="button is-block is-success is-normal is-fullwidth" :disabled="v$.$invalid" @click.prevent="changePassword">Valider <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        </form>
                    </div>
                    <button class="button is-danger is-light" @click.prevent="displayDeleteMessage = !displayDeleteMessage">Supprimer votre compte</button>
                    <br><br>
                    <div class="deleteMessage" v-if="displayDeleteMessage">
                        <h3>Etes vous certain de vouloir supprimer votre compte ?</h3><br>
                        <div>
                            <label for="passwordDeleteAccount">Saisissez votre mot de passe :</label><br>
                            <input class="input is-normal" type="password" placeholder="Votre mot de passe" v-model="passwordDeleteAccount"><br><br>
                            <button class="button is-danger" @click.prevent="deleteAccount"> Supprimer definitivement votre compte </button>
                            <div :class="{'notification is-danger is-light': isAlert, 'notification is-success is-light': !isAlert}" v-if="feedbackDeleteAccount != ''"> {{ feedbackDeleteAccount }} </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, sameAs } from '@vuelidate/validators'
import axios from 'axios'
import { mapState } from 'vuex';

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
            feedbackMessageProfilPicture: '',
            feedbackMessagePassword: '',
            imgIsChecked: false, 
            img : {
                size: 0, 
                height: 0, 
                width: 0, 
                url: this.$store.state.profilPictureS
            },
            typedCurrentPassword: '',
            newPassword:'', 
            confirmNewPassword:'',
            feedbackDeleteAccount: '',
            passwordDeleteAccount: '',
            displayDeleteMessage: false
        }
    },
    validations () {
        return {
            typedCurrentPassword: {
            required,
            password_validation: {
                $validator: validPassword,
                $message: 'Votre mot de passe doit contenir au moins 6 caractères dont 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial.'
                } 
            },
            newPassword: {
            required,
            password_validation: {
                $validator: validPassword,
                $message: 'Votre mot de passe doit contenir au moins 6 caractères dont 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial.'
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
                this.feedbackMessageProfilPicture = "Veuillez choisir une image au format jpg, jpeg, png et gif"
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
                        this.feedbackMessageProfilPicture = "Vérifier les dimensions de votre image (300x300 maximum)";
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
                formData.append("profilPicture", this.$store.state.profilPicture);
                axios.put('http://localhost:3000/profil/profilPicture/', formData, { 
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }})
                .then(response => {
                    this.isAlert = false;
                    this.feedbackMessageProfilPicture = response.data.message;
                    this.img.size = 0;
                    this.img.height = 0; 
                    this.img.width = 0;
                    this.imgIsChecked = false;
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
            axios.put('http://localhost:3000/profil/updatePassword/', passwordObject, { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                this.isAlertPassword = false;
                this.feedbackMessagePassword = response.data.message;
                setTimeout(() => {
                    this.$router.go('/userAccount')  
                }, 1500)
            })
            .catch(err => {
                this.isAlertPassword = true;
                this.feedbackMessagePassword = err.response.data.message;
            })
        },
        deleteAccount() {
            let deleteAccountObject = {
                userId: this.$store.state.userId, 
                password: this.passwordDeleteAccount
            }
            axios.put('http://localhost:3000/profil/deleteAccount/', deleteAccountObject, { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then((response) => {
                console.log(response)
                this.feedbackDeleteAccount = response.data.message;
                this.isAlertDelete = false;
                setTimeout(() => {
                    this.$router.go()  
                }, 2000);
                this.$localStorage.clear();
                this.$store.commit('LOGOUT');
                this.$store.commit('CLEAR_STATE');
                })
            .catch(error => {
                console.log(error)
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
        },
        ...mapState([
                'userId',
                'lastnameS',
                'firstnameS',
                'usernameS',
                'divisionS',
                'tokenToCheck',
                'profilPictureS',
                'isValid',
                'isLogged'
        ])
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