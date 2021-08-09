<template>
    <div><br>
        <div class="columns is-centered">
            <div class="column is-8">
                <div class="card events-card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Listes Utilisateurs
                        </p>
                    </header>
                    <div class="card-table">
                        <div class="content">
                            <table class="table is-fullwidth is-striped">
                                <tbody>
                                    <tr v-for="(user,index) in usersList" 
                                        :key="index" class="tr_container">
                                        <div class="user_container">
                                            <td width="5%"><i class="far fa-user"></i></td>
                                            <td>Nom: <strong>{{ user.lastname }}</strong> , Prénom: <strong>{{ user.firstname}}</strong>, Privilèges: <strong>{{ user.privileges }}</strong></td>
                                            <td class="level-right">
                                                <router-link :to="{ name: 'userLog', params: { id: user.id }}">
                                                    <a class="button is-small is-info">Profil</a>
                                                </router-link> 
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
            usersList: []
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
            flex-direction: column;
            align-items: center;
            border: 1px solid #dbdbdb;
            border-width: 0 0 1px;
            & td{
                border: none;
               border-width: none;
            }
            & .button.is-small.is-info{
                border-radius: 10px;
                min-width: 100px;
            }
        }
    }
</style>