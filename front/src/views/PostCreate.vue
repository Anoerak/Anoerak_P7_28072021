<template> 
    <section class="hero2 is-success is-fullheight" v-if="isLogged">
        <div class="hero-body">
            <div class="field">
                <label class="label">Titre</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Titre de votre Post" v-model="titleToPost">
                    </div>
            </div>

            <div class="field">
                <label class="label">Catégorie</label>
                <div class="control">
                    <div class="select">
                        <select v-model="categoryToPost">
                            <option>Actualité</option>
                            <option>Animaux</option>
                            <option>Film</option>
                            <option>Musique</option>
                            <option>People</option>
                            <option>Politique</option>
                            <option>Voyage</option>
                        </select>
                    </div>
                </div>
            </div>
            <form class="profile_picture" action="">
            <div :class="{'notification is-success is-light': !isAlert, 'notification is-danger is-light': isAlert}" v-if="feedbackMessage != ''"> {{ feedbackMessage }} </div>
                <figure class="avatar">
                    <img :src="this.img.url" v-if="this.imgIsChecked" class="previewImg" alt="Preview post">
                </figure>
                <div id="user_profilPicture" class="file is-info has-name">
                    <label class="file-label">
                        <input class="file-input" type="file" ref="file" name="file" accept="image/*" @change="checkImage()" >
                        <span class="file-cta">
                        <i class="fas fa-upload"></i>
                        <span class="file-label">
                            Votre GIF...
                        </span>
                        </span>
                        <span class="file-name">
                            {{img.url}}
                        </span>
                    </label>
                </div>
            </form>
            <br>

            <div class="field">
                <label class="label">Message</label>
                <div class="control">
                    <input class="textarea" placeholder="Votre message" v-model="messageToPost">
                </div>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" @click.prevent="postMessage">Valider</button>
                </div>
                <div class="control">
                        <router-link :to="'/PostsList'">
                            <button class="button is-text">Annuler</button>
                        </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'


export default {
  data() {
    return {
        displayFormPost: false,
        titleToPost: '',
        categoryToPost: '',
        messageToPost: '',
        isAlert: true,
        feedbackMessage: '',
        imgIsChecked: false, 
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
            let title = this.titleToPost;
            let category = this.categoryToPost;
            let message = this.messageToPost;
            let syntaxeMessageAllowed = /^[a-zA-Z0-9 _.,!:?€çÇ'’(Ééèàû)&]{2,250}$/;  
            if(syntaxeMessageAllowed.test(message)) {
                const formData = new FormData();
                formData.append ("authorId", this.$store.state.userId)
                formData.append("image", file);
                formData.append("title", title);
                formData.append("category", category);
                formData.append("message", message);
                axios.post('http://localhost:3000/postsList/post/', formData, { 
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
                    this.title = '';
                    this.category = '';
                    this.messageToPost = '';                    
                    this.imgIsChecked = false;
                    setTimeout(() => {
                        this.$router.push('/postsList')
                    }, 1250)
                })
                .catch(error => {
                    this.feedbackMessage = error; 
                    this.isAlert = true; 
                })
            }
            else {
                this.feedbackMessage = "Le message contient des caractères non autorisés ou est supérieur à 250 caractères"
                this.isAlert = true; 
            }
        } else {
            this.feedbackMessage = "Erreur avec l'image transmise";
            this.isAlert = true;
        }
    },
    checkImage() {
        let imageToCheck = this.$refs.file.files[0];
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

        if(!imageToCheck || imageToCheck.type.indexOf('image/') !== 0) {
            this.feedbackMessage = "Fichier non autorisé";
            this.isAlert = true; 
            this.imgIsChecked = false;
            return;
        }

        if(!allowedTypes.includes(imageToCheck.type)){
            this.feedbackMessage = "Veuillez choisir une image au format jpg, jpeg, png et gif"
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
                    this.feedbackMessage = "Vérifier les dimensions de votre image (600x600 maximum)";
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
  computed: {
    ...mapState([
            'userId',
            'tokenToCheck',
            'isLogged'
    ])
  }
}
</script>
