<template>
    <div>
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
                                    <tr v-for="(user,index) in usersList" 
                                        :key="index" >
                                        <td width="5%"><i class="fa fa-bell-o"></i></td>
                                        <td>Nom: <strong>{{ user.lastname }}</strong> , Prénom: <strong>{{ user.firstname}}</strong></td>
                                        <td class="level-right">
                                            <router-link :to="{ name: 'userLog', params: { id: user.id }}">
                                                <a class="button is-small is-primary">Profil</a>
                                            </router-link> 
                                        </td>                                            
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
                console.log(response)
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

</style>