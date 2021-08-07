<template>
  <div class="post-single">
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
          <!-- <Commentaires 
          v-for="comment in comments"
          :comment="comment"
          :key="comment.id"
          /> -->
      </div>
    </section>
  </div>
</template>


<script>
// import Commentaires from '../components/PostComments.vue' 
import Comment from '../components/Comment.vue'
import axios from 'axios'
import { mapState } from 'vuex' 
import moment from 'moment'

export default {
  drop:['postAuthor'],
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
      postAuthor: '',
      postAuthorName: '',
      postImage: ''
    }
  },
  components: {
    // Commentaires,
    Comment
  },
  methods: {
    displayOnePost(){
        axios.get('http://localhost:3000/postsList/getOne/',
          { headers: {
            'Authorization': `token ${this.$store.state.tokenToCheck}`
            }}
            )
        .then(response => {
          console.log(response)
            this.postTitle = response.data.resultat[0].title;
            this.postDate = response.data.resultat[0].date;
            this.postMessage = response.data.resultat[0].message;
            this.postDivision = response.data.resultat[0].division;
            this.postCategory = response.data.resultat[0].category;
            this.$store.state.authorId = response.data.resultat[0].authorId;
            this.postImage = response.data.resultat[0].image;
        })
        .catch(error => {
            console.log(error.response.data)
        })
    },
    getInfos(author) {
      console.log(author)
    axios.get('http://localhost:3000/user/getInfos/' + author, { 
                headers: {
                    'Authorization': `token ${this.$store.state.tokenToCheck}`
                }
            })
    .then(result => {
      console.log('author : '+ result)
            this.postAuthorName = result.data[0].username;
            this.postDivision = result.data[0].division;
    })
    .catch(error => {
        console.log('author : '+error)
    })
},
  }, 
  mounted() {
      this.displayOnePost();
      console.log(this.authorId)
      this.getInfos();
  },
  beforeupdated() {
      this.displayOnePost()
      this.getInfos();
  },
  computed: {
    ...mapState([
            'userId',
            'lastnameS',
            'firstnameS',
            'usernameS',
            'emailS',
            'divisionS',
            'tokenToCheck',
            'profilPictureS',
            'privilegesS',
            'isValid',
            'isLogged',
            'authorId'
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