<template>
    <section class="hero2 is-success is-fullheight" v-if="loggedIn">
    <div :class="{'notification is-danger is-light': isAlert, 'notification is-primary is-light': !isAlert}" v-if="feedbackDeleteAccount != ''">{{ feedbackDeleteAccount }}</div>
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h3 class="title has-text-black">Profil de {{ userUsername }}</h3>
                    <div class="box">
                        <form class="profile_picture" action="">
                            <figure class="avatar">
                                <img :src="userProfilPicture">
                            </figure>
                        </form>
                        <form>
                        <div class="columns row-one" >
                            <div class="column is-three-fifths">
                                <div class="field">
                                    <div class="control">
                                        <span class="input is-normal" type="text" > {{userFirstname}} </span>                                       
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <span class="input is-normal" type="text"> {{ userLastname }} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns row-one">
                            <div class="column is-half">
                                <div class="control">
                                    <div class="input">
                                        <span> {{ userDivision}} </span>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-haf">
                                <div class="field">
                                    <div class="control">
                                        <span class="input is-normal" type="text"> {{ userUsername }} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                    <button class="button is-danger is-light" @click.prevent="displayDeleteMessage = !displayDeleteMessage">Supprimer ce compte</button>
                    <br><br>
                    <div class="deleteMessage" v-if="displayDeleteMessage">
                        <h3>Etes vous certain de vouloir supprimer votre compte ?</h3><br>
                        <div>
                            <button class="button is-danger" @click.prevent="deleteAccount"> Supprimer definitivement ? </button>
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
import axios from 'axios'
import { mapState } from 'vuex';
import  {useRoute} from 'vue-router'


export default {
    setup () {
        return { v$: useVuelidate () }
    },
    data() {
        return {
            isAlert: false,
            isAlertPassword: false,
            feedbackDeleteAccount: '',
            displayDeleteMessage: false,
            userId:'',
            userFirstname:'',
            userLastname:'',
            userUsername:'',
            userProfilPicture:'',
            userDivision:''
        }
    },
    methods: {
        getInfos(userId) {
            // console.log(userId)
            axios.get('http://localhost:3000/user/getInfos/' + userId, { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
            .then(result => {
                // console.log(result)
                    this.userUsername = result.data[0].username;
                    this.userFirstname = result.data[0].firstname;
                    this.userLastname = result.data[0].lastname;
                    this.userProfilPicture = result.data[0].profilPicture;
                    this.userDivision = result.data[0].division;
            })
            .catch(error => {
                console.log('author : '+error)
            })
            },
        deleteAccount() {
            let data = {
                userId: this.$store.state.userId, 
                accountId: this.userId
            }
            console.log(data)
            axios.put('http://localhost:3000/admin/deleteUser/' + this.userId, data, { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then((response) => {
                console.log(response)
                this.feedbackDeleteAccount = response.data.message;
                this.isAlertDelete = false;
                setTimeout(() => {
                    this.$router.push('/admin/usersListDelete')  
                }, 2000);
                })
            .catch(error => {
                console.log(error)
                this.feedbackDeleteAccount = error.response.data.message;
                this.isAlertDelete = true;
                })
        }
    },
    beforeupdated() {
    const route = useRoute();
    this.userId = route.params.id;
    this.getInfos(this.userId)
    },
    mounted(){
    const route = useRoute();
    this.userId = route.params.id;
    this.getInfos(this.userId)
    },
    computed: {
        loggedIn() {
        return this.$store.getters.isLogged; 
        }, 
        tokenToCheck() {
        return this.$store.state.tokenToCheck;
        },
        ...mapState([
                'tokenToCheck',
                'privilegesS',
                'isValid',
                'isLogged'
        ]),
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