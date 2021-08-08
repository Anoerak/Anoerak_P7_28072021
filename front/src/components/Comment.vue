<template>
    <div id="comment">
        <div :class="{'notification is-danger is-light': isAlert, 'notification is-success is-light': !isAlert}" v-if="feedbackMessage != ''">{{ feedbackMessage }}</div>
        <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
            <img class="is-rounded" :src="profilPictureS">
            </p>
        </figure>
        <form class="media-content">
            <div class="field">
            <p class="control">
                <input class="textarea" placeholder="Ajoutez votre commentaire..."  v-model="v$.commentToPost.$model"/>
            </p>
            </div>
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div class="input-errors" v-for="(error, index) of v$.commentToPost.$errors" :key="index">
                        <div class="help is-danger">{{ error.$message }}</div></div>
                    </div>
                    <button class="button is-primary" :disabled="v$.$invalid" @click.prevent="postComment(postIds)">Valider</button>
                </div>
                <br>
                <br>
            </div>
        </form>
        </article>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';

export function validPost(post) {
  let validPostPattern = new RegExp("^[a-z A-Z0-9-@é'(è!çà)€^%ù:.;?,+=]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validPostPattern.test(post)){
    return true;
  }
  return false;
}

export default {
    props: [  'index'], 
    data() {
        return {
            v$: useVuelidate(),
            Auteur: '',
            avatarAuteur: '',
            displayPostComments: [],
            commentToPost: '',
            isAlert: true,
            feedbackMessage: '',
            comments: [],
        }
    },
    methods:{
        postComment() {
            console.log(this.postId)
            let comment = {
                message: this.commentToPost,
                postId: this.postId,
                authorName: this.usernameS,
                authorId: this.userId
            }
            console.log(comment)
            axios.post('http://localhost:3000/postsList/post/comment', comment , { 
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
                    this.$router.go()
                }, 2000);
            })
            .catch(error => {
                console.log(error)
                this.feedbackMessage = error.response.data.message; 
                this.isAlert = true; 
            })
        },
    },
    computed: {
    ...mapState([
            'tokenToCheck',
            'profilPictureS',
            'isLogged',
            'usernameS',
            'userId',
            'postId'
        ]),
    },
    validations () {
        return {
            commentToPost: {
            required,
            minLength: minLength(2),
            maxLength: maxLength(250),
            comment_validation: {
                $validator: validPost,
                $message: "Post invalide."+
                "\n Utiliser uniquement des lettres et les caractères spéciaux suivants :" + 
                "\n -@é'(è!çà)€^%ù:.;?,+="
                } 
            }
        }
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
    .level-left{
        display: flex;
        flex-direction: column;
        align-items: baseline;
    }
    .level-item{
        display: flex;
        flex-direction: column;
        align-items: baseline;
    }
</style>