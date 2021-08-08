<template>
<div>
     <!-- <nav class="navbar is-white">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item brand-text" href="../index.html">
          Bulma Admin
        </a>
                <div class="navbar-burger burger" data-target="navMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div id="navMenu" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" href="admin.html">
            Home
          </a>
                    <a class="navbar-item" href="admin.html">
            Orders
          </a>
                    <a class="navbar-item" href="admin.html">
            Payments
          </a>
                    <a class="navbar-item" href="admin.html">
            Exceptions
          </a>
                                 <a class="navbar-item" href="admin.html">
            Reports
          </a>
                </div>

            </div>
        </div>
    </nav> -->
    <div v-if="privilegesS = 'admin'">
         <div class="container">
            <div class="columns">
                <div class="column is-3 ">
                    <aside class="menu is-hidden-mobile">
                        <p class="menu-label">
                            Administration
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a><router-link to='/admin/'>Outils de gestion</router-link></a>
                                <ul>
                                    <li><a><router-link to='/admin/usersList'>Liste Utilisateurs</router-link></a></li>
                                    <li><a><router-link to='/admin/flaggedPosts'>Posts signalés</router-link></a></li>
                                    <li><a><router-link to='/admin/flaggedPosts'>Ajouter un compte</router-link></a></li>
                                    <li><a><router-link to='/admin/usersListDelete'>Supprimer un compte</router-link></a></li>
                                </ul>
                            </li>
                        </ul>
                    </aside>
                </div>
                <div class="column is-10">
                    <section class="hero is-info welcome is-small">
                        <div class="hero-body">
                            <div class="container">
                                <h1 class="title">
                                    Bonjour {{ usernameS }}.
                                </h1>
                                <h2 class="subtitle">
                                    Nous espérons que vous passez une agréable journée 😀 !!
                                </h2>
                            </div>
                        </div>
                    </section>
                    <section class="info-tiles">
                        <div class="tile is-ancestor has-text-centered">
                            <div class="tile is-parent">
                                <article class="tile is-child box">
                                    <p class="title">{{ nbUsers.length }}</p>
                                    <p class="subtitle">Nombre d'utilisateurs</p>
                                </article>
                            </div>
                            <div class="tile is-parent">
                                <article class="tile is-child box">
                                    <p class="title">{{ nbPosts.length }}</p>
                                    <p class="subtitle">Nombre de Posts</p>
                                </article>
                            </div>
                            <div class="tile is-parent">
                                <article class="tile is-child box">
                                    <p class="title">{{ nbComments.length }}</p>
                                    <p class="subtitle">Nombre de Commentaires</p>
                                </article>
                            </div>
                            <div class="tile is-parent">
                                <article class="tile is-child box">
                                    <p class="title">{{ nbFlagged.length }}</p>
                                    <p class="subtitle">Posts Signalés</p>
                                </article>
                            </div>
                        </div>
                    </section>
                        <div class="container_filtered">
                            <router-view></router-view>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from "vuex"
import axios from 'axios'


export default {
      data() {
        return {
            displayFormPost: false,
            isAlert: true,
            feedbackMessage: '',
            nbUsers: [],
            nbPosts:[],
            nbComments:[],
            nbFlagged:[]
        }
    },
      methods: {
        getStatsUsers(){
            axios.get('http://localhost:3000/admin/users',
            { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }}
                )
            .then(response => {
            // console.log(response)
                this.nbUsers = response.data.users;
            })
            .catch(error => {
                console.log(error);
            })
        },
        getStatsPosts(){
            axios.get('http://localhost:3000/admin/posts',
            { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }}
                )
            .then(response => {
            // console.log(response)
                this.nbPosts = response.data.posts; 
            })
            .catch(error => {
                console.log(error);
            })
        },
        getStatsComments(){
            axios.get('http://localhost:3000/admin/comments',
            { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }}
                )
            .then(response => {
            // console.log(response)
                this.nbComments = response.data.comments; 
            })
            .catch(error => {
                console.log(error);
            })
        },
        getStatsFlagged(){
            axios.get('http://localhost:3000/admin/flagged',
            { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }}
                )
            .then(response => {
            // console.log(response)
                this.nbFlagged = response.data.flagged; 
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    computed:{
        ...mapState([
            'privilegeS',
            'usernameS'
        ])
    },
    mounted() {
      this.getStatsUsers();
      this.getStatsPosts();
      this.getStatsComments();
      this.getStatsFlagged();
    },
}
</script>
