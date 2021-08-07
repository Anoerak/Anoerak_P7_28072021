<template>
    <div id="comment">
        <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
            <img class="is-rounded" :src="profilPictureS">
            </p>
        </figure>
        <div class="media-content">
            <div class="field">
            <p class="control">
                <textarea class="textarea" placeholder="Ajoutez votre commentaire..."></textarea>
            </p>
            </div>
            <nav class="level">
            <div class="level-left">
                <div class="level-item">
                <a class="button is-primary">Valider</a>
                </div>
            </div>
            <br>
            <br>
            <br>
            </nav>
        </div>
        </article>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from 'axios'

export default {
    props: ['authorId', 'message' , 'image', 'index', 'id', 'isFlagged'], 
    data() {
        return {
            Auteur: '',
            avatarAuteur: '',
            displayPostComments: [],
            commentToPost: '',
            isAlert: true,
            feedbackMessage: '',
            comments: []
        }
    },
    methods:{
        displayComments(id) {
            axios.get('http://localhost:3001/fil/comment/get/'+id , { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
            .then(response => {
                this.comments = response.data.resultat;
            })
            .catch(error => {
                console.log(error);
            })
        },
        postComment(id) {
            let syntaxe = /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{1,}$/;
            if(syntaxe.test(this.commentToPost)) {
                let comment = {
                    message: this.commentToPost,
                    postId: id,
                    auteur: this.$store.state.pseudoUser,
                    idAuteur: this.$store.state.userId
                }
                axios.post('http://localhost:3001/fil/post/comment', comment , { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
                .then(response => {
                    this.feedbackMessage = response.data.message;
                    this.isAlert = false; 
                    this.comments.push(this.commentToPost);
                    this.commentToPost = '';
                    setTimeout(() => {
                        this.feedbackMessage = ''
                    }, 2000);
                    this.displayComments(id);
                })
                .catch(error => {
                    this.feedbackMessage = error.response.data.message; 
                    this.isAlert = true; 
                })
            } else {
                this.errorMessage = "Le message ne respecte pas la syntaxe autorisée";
                return;
            }
        },
    },
    computed: {
    ...mapState([
            'tokenToCheck',
            'profilPictureS',
            'isLogged'
        ]),
    }
}
</script>


<style lang="scss" scoped>
    figure{
        margin-left: 1rem;
    }
    .media-content{
        margin-right: 1rem;
    }
</style>