<template>
  <div class="post-single">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            name
          </h1>
          <h2 class="subtitle ">
            <strong>Date:</strong> {{  }}
            <br>
            <strong>Heure:</strong> time
          </h2>
        </div>
      </div>
    </section>
    <section class="post-content">
      <div class="container">
        <p class="is-size-4 description">description</p>
        <p class="is-size-5"><strong>Division:</strong> division</p>
        <p class="is-size-5"><strong>Catégorie:</strong> category</p>
        <p class="is-size-5"><strong>Auteur:</strong> author</p>
        <div class="post-images columns is-multiline has-text-centered">
          <!-- <div v-for="image in post.images" 
                :key="image.id" 
                class="column is-one-third">
            <img :src="image" :alt="post.name"/>
          </div> -->
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
import {useRoute} from 'vue-router'
 

export default {
  data() {
    return {
      displayCommentEdit: false
    }
  },
  components: {
    // Commentaires,
    Comment
  },
  methods: {
    displayOnePost(){
      const route = useRoute();
      let DI = Number(route.params.id)
      console.log(DI)
        axios.get('http://localhost:3000/postsList/getOne/',
          { headers: {
            'Authorization': `token ${this.$store.state.tokenToCheck}`
            }}
            )
        .then(response => {
          console.log(response)
            this.posts = response.data.resultat; 
        })
        .catch(error => {
            console.log(error.response.data)
        })
    },
    checkImage() {
        let imageToCheck = this.$refs.file.files[0];
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

        if(!imageToCheck || imageToCheck.type.indexOf('image/') !== 0) {
            this.feedbackMessage = "Erreur dans le type de fichier";
            this.isAlert = true; 
            this.imgIsChecked = false;
            return;
        }

        if(!allowedTypes.includes(imageToCheck.type)){
            this.feedbackMessage = "Seules sont autorisées les images jpg, jpeg, png et gif"
            this.isAlert = true; 
            this.imgIsChecked = false; 
            return;
        }

        this.img.size = imageToCheck.size / 1000;

        if(this.img.size > 5000) {
            this.feedbackMessage = "L'image transmise est trop lourde (5Mo max)";
            this.isAlert = true; 
            this.imgIsChecked = false;
            return;
        }

        let fileReader = new FileReader(); 
        fileReader.readAsDataURL(imageToCheck);
        fileReader.onload = evt => {
            let image = new Image();
            image.onload = () => {
                this.img.height = image.height;
                this.img.width = image.width;
                if(this.img.height > 600 || this.img.width > 600){
                    this.feedbackMessage = "L'image doit être de taille 600x600 max";
                    this.isAlert = true; 
                    this.imgIsChecked = false;
                    return;
                }
            }
            image.src = evt.target.result;
        }

        this.imgIsChecked = true;
        this.feedbackMessage = ''; 
        this.isAlert = false;
        this.img.url = URL.createObjectURL(imageToCheck);
        return;
    }
  }, 
  mounted() {
      this.displayOnePost();
  },
  beforeupdated() {
      this.displayOnePost();
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
            'isLogged'
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