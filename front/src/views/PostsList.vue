<template>
  <div class="posts container">
    <router-link :to="'/Create/'">
    <button class="button is-info  is-pulled-right">Ajouter votre Post</button>
    </router-link>
    <h2 class="subtitle is-3">
    Consulter les dernières publications de vos collègues.
    </h2><br>
    <div :class="{'help is-danger': isAlert, 'help is-success': !isAlert}" v-if="errorMessage != ''">{{ errorMessage }}</div>
    <div class="columns is-multiline">
      <div 
        v-for="post in posts" 
        :post="post"
        :key="post.id"
        class="column is-one-quarter" >
        <router-link
          :to="'/post/' + post.id" >
          <PostCard :post="post" />
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'



export default {
  name: 'PostsList',
  data() {
    return {
        displayFormPost: false,
        messageToPost: '',
        isAlert: true,
        feedbackMessage: '',
        imgIsChecked: false, 
        posts: [],
        img : {
            size: 0, 
            height: 0, 
            width: 0, 
            url:''
        }
    }
  },
  methods: {
    postMessage() {
        if(this.imgIsChecked)
        {
            let file = this.$refs.file.files[0];
            let message = this.messageToPost;
            let syntaxeMessageAllowed = /^[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{2,100}$/;  
            if(syntaxeMessageAllowed.test(message)) {
                const formData = new FormData();
                formData.append ("authorId", this.$store.state.userId)
                formData.append("image", file);
                formData.append("message", message);
                axios.post('http://localhost:3000/fil/post/', formData, { 
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `token ${this.$store.state.tokenToCheck}`
                    }
                })
                .then(response => {
                    this.feedbackMessage = response.data.message;
                    this.isAlert = false; 
                    this.displayFormPost = false;
                    this.img.url = '';
                    this.img.size = 0;
                    this.img.height = 0; 
                    this.img.width = 0;
                    this.messageToPost = '';
                    this.imgIsChecked = false;
                    this.displayAllPosts();
                })
                .catch(error => {
                    this.feedbackMessage = error.response.data.message; 
                    this.isAlert = true; 
                })
            }
            else {
                this.feedbackMessage = "Le message contient des caractères non autorisés ou est supérieur à 100 caractères"
                this.isAlert = true; 
            }
        } else {
            this.feedbackMessage = "Erreur avec l'image transmise";
            this.isAlert = true;
        }
    },
    displayAllPosts(){
        axios.get('http://localhost:3000/PostsList/getAll/',
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