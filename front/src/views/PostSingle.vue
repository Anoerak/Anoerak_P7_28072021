<template>
  <div class="post-single" v-if="isLogged">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ postTitle }}
          </h1>
          <h2 class="subtitle ">
            <strong>Date:</strong> {{ moment(postDate).format('DD MM YYYY') }}
            <br>
            <strong>Heure:</strong> {{ moment(postDate).format('hh:mm') }}
          </h2>
        </div>
      </div>
    </section>
    <section class="post-content">
      <div class="container">
        <p class="is-size-4 description">{{ postMessage }}</p>
        <p class="is-size-5"><strong>Division:</strong> {{ postDivision }}</p>
        <p class="is-size-5"><strong>Catégorie:</strong> {{ postCategory}}</p>
        <p class="is-size-5"><strong>Auteur:</strong> {{ postAuthorName}}</p>
        <div class="post-images columns is-multiline has-text-centered">
          <div class="column is-one-third">
            <img :src="postImage" :alt="postTitle"/>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div id="test">
        <button class="button is-info  is-pulled-right" @click.prevent="displayCommentEdit = !displayCommentEdit">Poster un commentaire</button>
          <h2 class="subtitle is-4">Vos commentaires</h2>
              <Comment v-if="displayCommentEdit"/>
                <Commentaires 
                v-for="comment in comments"
                :key="comment.id"
                :message="comment.message"
                :author="comment.authorName"
                />
      </div>
    </section>
  </div>
</template>


<script>
import Commentaires from '../components/PostComments.vue' 
import Comment from '../components/Comment.vue'
import axios from 'axios'
import { mapState } from 'vuex' 
import moment from 'moment'
import  {useRoute} from 'vue-router'

export default {

    created: function () {
      this.moment = moment;
    },
  data() {
    return {
      displayCommentEdit: false,
      postTitle: '',
      postDate: '',
      postMessage: '',
      postDivision: '',
      postCategory: '',
      postAuthorId: '',
      postAuthorName: '',
      postImage: '',
      postId: '',
      comments: []
    }
  },
  components: {
    Commentaires,
    Comment
  },
  methods: {
    displayOnePost(postId){
        axios.get('http://localhost:3000/postsList/getOne/' +  postId,
          { headers: {
            'Authorization': `token ${this.$store.state.tokenToCheck}`
            }}
            )
        .then(response => {
            this.postTitle = response.data.resultat[0].title;
            this.postDate = response.data.resultat[0].date;
            this.postMessage = response.data.resultat[0].message;
            this.postDivision = response.data.resultat[0].division;
            this.postCategory = response.data.resultat[0].category;
            this.postImage = response.data.resultat[0].image;
        })
        .catch(error => {
            console.log(error.response.data)
        })
    },
    getInfos(postAuthorId) {
    axios.get('http://localhost:3000/user/getInfos/' + postAuthorId, { 
                headers: {
                    'Authorization': `token ${this.$store.state.tokenToCheck}`
                }
            })
    .then(result => {
            this.postAuthorName = result.data[0].username;
            this.postDivision = result.data[0].division;
    })
    .catch(error => {
        console.log('author : '+error)
    })
    },
            getComments() {
            axios.get('http://localhost:3000/postsList/get/comments/' + 2, { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
            .then(response => {
                console.log(response)
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
                    authorName: this.$store.state.username,
                    authorId: this.$store.state.userId
                }
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
                    }, 2000);
                    this.getComments(id);
                })
                .catch(error => {
                    this.feedbackMessage = error.response.data.message; 
                    this.isAlert = true; 
                })
            } else {
                this.errorMessage = "Le message ne respecte pas la syntaxe autorisée";
                return;
            }
        }

  },
  mounted() {
    const route = useRoute();
    this.postId = route.params.id;
    this.postAuthorId = route.params.authorId;
    this.displayOnePost(this.postId),
    this.getInfos(this.postAuthorId),
    this.getComments()
  },
  beforeupdated() {
    const route = useRoute();
    this.postId = route.params.id;
    this.postAuthorId = route.params.authorId;
    this.displayOnePost(this.postId)
  },
  computed: {
    ...mapState([
            'tokenToCheck',
            'isLogged',
    ]),
  }
}
</script>

<style lang="scss" scoped>
  .hero-body{
    background-color: rgba(0, 0, 255, 0.562);
  }
  .subtitle, .title {
    text-align: center;
  }
  .is-4{
    margin-top: 100px;
    text-align: center;
  }
  .button{
    margin-right: 1rem;
  }


  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>