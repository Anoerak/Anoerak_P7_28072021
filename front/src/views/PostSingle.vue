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
            <strong>Heure:</strong> {{ moment(postDate).format('HH:mm') }}
          </h2>
          <div :class="{'notification is-danger is-light': isAlert, 'notification is-primary is-light': !isAlert}" v-if="feedbackMessage != ''">{{ feedbackMessage }}</div>
        </div>
      </div>
    </section>
    <section class="post-content" :style="{'margin':'1rem'}">
      <div class="container">
        <div class="flag_container">
            <p class="is-size-4 description">{{ postMessage }}</p>
            <button class="button is-danger is-light" v-if="privilegesS === 'user'"  @click.prevent="flagPost">Signaler ce post</button>
            <button class="button is-primary is-light" v-if="privilegesS === 'admin'"  @click.prevent="unflagPost">Retirer le signalement</button>
        </div>
        <br>
        <div class="delete_container">
            <p class="is-size-5"><strong>Division:</strong> {{ postDivision }}</p>
            <button class="button is-danger" v-if="privilegesS === 'admin'" @click.prevent="deletePost">Supprimer ce post</button>
        </div>
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
          <h2 class="subtitle is-4">Vos commentaires</h2><br><br>
              <Comment v-if="displayCommentEdit"/>
                <Commentaires 
                v-for="(comment, commentIndex) in comments"
                :key="comment.id"
                :message="comment.message"
                :division="comment.division"
                :privileges="comment.privileges"
                :date="comment.date"
                :author="comment.authorName"
                :profilPicture="comment.profilPicture"
                :commentId="comment.id"
                :index="commentIndex"
                />
      </div>
    </section>
  </div>
</template>


<script>
import Comment from '../components/Comment.vue'
import Commentaires from '../components/PostComments.vue'
import axios from 'axios'
import { mapState } from 'vuex' 
import moment from 'moment'
import  {useRoute} from 'vue-router'

export default {
  props:['id', 'isFlagged'],
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
      postFlagStatus:'',
      comments: [],
      commentToPost:'',
      isAlert:false,
      feedbackMessage:''
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
          // console.log(response)
            this.postTitle = response.data.resultat[0].title;
            this.postDate = response.data.resultat[0].date;
            this.postMessage = response.data.resultat[0].message;
            this.postCategory = response.data.resultat[0].category;
            this.postFlagStatus = response.data.resultat[0].isFlagged;
            this.postImage = response.data.resultat[0].image;
            this.$store.state.postId = response.data.resultat[0].id;
            // console.log(this.$store.state.postId)
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
    getComments(postId) {
        axios.get('http://localhost:3000/postsList/get/comments/' + postId, { 
                    headers: {
                        'Authorization': `token ${this.$store.state.tokenToCheck}`
                    }
                })
        .then(response => {
            // console.log(response)
            this.comments = response.data.resultat;
            // console.log(this.comments)
        })
        .catch(error => {
            console.log(error);
        })
    },
    flagPost() {
        let data = {
            idToFlag: this.postId, 
            isFlagged: this.postFlagStatus
          }
        console.log(data);
        axios.put('http://localhost:3000/user/flagPost/'+ this.postId, data , { headers: {
            'Authorization': `token ${this.$store.state.tokenToCheck}`
            }})
        .then(response => {
            this.feedbackMessage = response.data.message;
            this.isAlert = false; 
            setTimeout(() => {
              this.$router.push('/postsList')  
            }, 2000)
        })
        .catch(error => {
            console.log(error.response.data.message);
            this.feedbackMessage = error.response.data.message;
            this.isAlert = true; 
            setTimeout(() => {
              this.$router.push('/postsList')  
            }, 2000)
        })
    },
    unflagPost() {
        let data = {
            idToFlag: this.postId, 
            userId: this.$store.state.userId,
            privileges: this.$store.state.privilegesS,            
            isFlagged: this.postFlagStatus
          }
        console.log(data);
        axios.put('http://localhost:3000/admin/flagPost/'+ this.postId, data , { headers: {
            'Authorization': `token ${this.$store.state.tokenToCheck}`
            }})
        .then(response => {
            this.feedbackMessage = response.data.message;
            this.isAlert = false; 
            setTimeout(() => {
              this.$router.push('/admin')  
            }, 2000)
        })
        .catch(error => {
            console.log(error.response.data.message);
            this.feedbackMessage = error.response.data.message;
            this.isAlert = true;
            setTimeout(() => {
              this.$router.go()  
            }, 2000)
        })
    },
    deletePost() {
        let data = {
          postId: this.postId,
          userId: this.$store.state.userId,
          privileges: this.$store.state.privilegesS
          }
        console.log(this.postId)
        axios.put('http://localhost:3000/admin/deletePost/' + this.postId, data,{ headers: {
            'Authorization': `token ${this.$store.state.tokenToCheck}`
            }})
        .then((response) => {
            console.log(response)
            this.feedbackMessage = response.data.message;
            this.isAlert = false;
            setTimeout(() => {
                this.$router.push('/admin')  
            }, 2000);
            })
        .catch(error => {
            console.log(error)
            this.feedbackMessage = error.response.data.message;
            this.isAlert = true;
            setTimeout(() => {
                this.$router.go()  
            }, 2000);
            })
    },
  },
  mounted() {
    const route = useRoute();
    this.postId = route.params.id;
    this.postAuthorId = route.params.authorId;
    this.displayOnePost(this.postId),
    this.getInfos(this.postAuthorId),
    this.getComments(this.postId)
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
            'privilegesS',
            'userId'
    ]),
  }
}
</script>

<style lang="scss" scoped>
  .hero-body{
    background-color: rgba(0, 0, 112, 0.623);
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
  .flag_container, .delete_container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & .button.is-danger.is-light, .button.is-danger.is-danger, .button.is-primary.is-light{
      margin-right: 0px;
      margin-left: 1rem;
      border-radius: 10px;
    }
  }
</style>