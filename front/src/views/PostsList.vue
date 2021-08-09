<template>
  <div class="posts container" v-if="isLogged">
    <router-link :to="'/Create/'">
    <button class="button is-info  is-pulled-right">Ajouter votre Post</button>
    </router-link>
    <h2 class="subtitle is-3">
    Consulter les dernières publications de vos collègues.
    </h2><br>
    <div :class="{'notification is-danger is-light': isAlert, 'notification is-success is-light': !isAlert}" v-if="feedbackMessage != ''">{{ feedbackMessage }}</div>
    <div class="columns is-multiline">
    <PostCard @postFlagged="displayAllPosts()" 
        v-for="(post, postIndex) in posts" 
        :post="post"
        :key="post.id"
        :id="post.id"
        :authorId="post.authorId"
        :title="post.title"
        :category="post.category"
        :image="post.image"
        :message="post.message"
        :date="post.date"
        :time="post.time"
        :nbcomments="post.nbComments"
        :index="postIndex"
        :isFlagged="post.isFlagged"
        class="column is-one-quarter" />
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PostCard from '../components/PostCard.vue'


export default {
  data() {
    return {
        displayFormPost: false,
        messageToPost: '',
        isAlert: true,
        feedbackMessage: '',
        imgIsChecked: false, 
        posts: [],
        date:[],
        img : {
            size: 0, 
            height: 0, 
            width: 0, 
            url:''
        }
    }
  },
  components: {
    PostCard
  },
  methods: {
    displayAllPosts(){
        axios.get('http://localhost:3000/postsList/getAll/',
          { headers: {
            'Authorization': `token ${this.$store.state.tokenToCheck}`
            }}
            )
        .then(response => {
          console.log(response)
            this.posts = response.data.resultat; 
        })
        .catch(error => {
            console.log(error);
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
      this.displayAllPosts();
  },
  beforeupdated() {
      this.displayAllPosts();
  },
  computed: {
    ...mapState([
            'tokenToCheck',
            'isLogged'
    ]),
  }
}

</script>


<style lang="scss" scoped>
  .posts {
    margin-top: 100px;
    text-align: center;
    & .button{
      background-color: rgba(0, 0, 0, 0.2);
      color: black;
    }
  }
</style>