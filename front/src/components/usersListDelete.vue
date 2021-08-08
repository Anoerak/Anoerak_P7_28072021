<template>
    <div><br>
        <div class="columns is-centered">
            <div class="column is-8">
                <div class="card events-card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Listes Utilisateurs
                        </p>
                        <a href="#" class="card-header-icon" aria-label="more options">
                            <span class="icon">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </a>
                    </header>
                    <div class="card-table">
                        <div class="content">
                            <table class="table is-fullwidth is-striped">
                                <tbody>
                                    <tr class="tr_container" v-for="(user,index) in usersList" 
                                        :key="index" >
                                        <div class="user_container">
                                            <td>Nom: <strong>{{ user.lastname }}</strong> , Prénom: <strong>{{ user.firstname}}</strong></td>
                                            <td class="level-right">                                            
                                            <button class="button is-small is-danger is-light" @click.prevent="displayDeleteMessage = !displayDeleteMessage">Supprimer le compte</button>                                            
                                            </td>
                                        </div>
                                        <div class="deleteMessage" v-if="displayDeleteMessage"><br>
                                            <h5>Etes vous certain de vouloir supprimer ce compte ?</h5><br>
                                            <div>
                                                <label for="passwordDeleteAccount">Saisissez le code suivant : {{ user.id }}</label><br>
                                                <input class="input is-normal" :class="{invalid: v$.confirmationId.$error}" type="password" placeholder="Code de confirmation" v-model="confirmationId"><br><br>
                                                <button class="button is-danger" @click.prevent="deleteAccount"> Supprimer definitivement le compte de {{user.lastname}} {{user.firstname}} ? </button>
                                                <div :class="{'notification is-danger is-light': isAlert, 'notification is-success is-light': !isAlert}" v-if="feedbackDeleteAccount != ''"> {{ feedbackDeleteAccount }} </div>
                                            </div>
                                            <br><br>
                                        </div>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, sameAs } from '@vuelidate/validators'


export default {
    setup () {
        return { v$: useVuelidate () }
    },

    data() {
        return {
            usersList: [],
            feedbackDeleteAccount: '',
            passwordDeleteAccount: '',
            confirmationId:'',
            displayDeleteMessage:false
        }
    }, 
    methods: {
        getUserList() {
            axios.get('http://localhost:3000/user/getAllUsers', { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                // console.log(response)
                this.usersList = response.data;
            })
            .catch(error => {
                console.log(error);
            })
        },
        deleteAccount() {
            let deleteConfirmation = {
                userId: this.confirmationId, 
            }
            console.log(this.confirmationId)
            axios.put('http://localhost:3000/admin/deleteUser/', deleteConfirmation, { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then((response) => {
                console.log(response)
                this.feedbackDeleteAccount = response.data.message;
                this.isAlertDelete = false;
                setTimeout(() => {
                    this.$router.go()  
                }, 2000);
                })
            .catch(error => {
                console.log(error)
                this.feedbackDeleteAccount = error.response.data.message;
                this.isAlertDelete = true;
                })
        }        
    }, 
    validations () {
        return {
            confirmationId: {
            required,
            sameAsPassword: sameAs(this.confirmationId)
            }
        }
    },    
    mounted() {
        this.getUserList();
    }
}
</script>

<style lang="scss" scoped>
.tr_container{
    & .user_container{
        display: flex;
        justify-content: space-between;
        border: 1px solid #dbdbdb;
        border-width: 0 0 1px;
        & td{
            border: none;
            border-width: none;
        }
    }
    & .deleteMessage{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
.button.is-small.is-danger{
    border-radius: 10px;
}

</style>