<template>
    <div><br>
        <div class="columns is-centered">
            <div class="column is-8">
                <div class="card events-card">
                    <header class="card-header">
                        <p class="card-header-title">
                            <strong>Listes Utilisateurs</strong>
                        </p>
                    </header>
                    <div class="card-table">
                        <div class="content">
                            <table class="table is-fullwidth is-striped">
                                <tbody>
                                    <tr class="tr_container" v-for="(user,index) in usersList" 
                                        :key="index"
                                        :id="user.id"
                                        :profilPicture="user.profilPicture"
                                        :username='user.username'
                                        :firstname="user.firstname"
                                        :lastname="user.lastname"
                                        :division="user.division" >
                                        <div class="user_container">
                                            <td width="5%"><i class="far fa-user"></i></td>
                                            <td>Nom: <strong>{{ user.lastname }}</strong> , Prénom: <strong>{{ user.firstname}}</strong></td>
                                            <td class="level-right">                                            
                                            <router-link :to="'/admin/userDelete/' + user.id "><button class="button is-small is-danger is-light" >Supprimer le compte</button></router-link>                                            
                                            </td>
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

export default {
    data() {
        return {
            usersList: [],
        }
    }, 
    methods: {
        getUserList() {
            axios.get('http://localhost:3000/user/getAllUsers', { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                console.log(response)
                this.usersList = response.data;
                this.userId = response.data[0].id
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
        },
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
        flex-direction: column;
        align-items: center;
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