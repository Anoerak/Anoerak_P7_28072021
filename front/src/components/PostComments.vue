<template>
    <article class="message">
            <div class="message-header">
                <p>{{ comment.authorName }} le {{ moment(comment.date).format('DD.MM.YYYY') }} à {{ moment(comment.date).format('hh:mm:ss') }}</p>
                <p>{{ comment.division}}</p>
            </div>
            <div class="message-body">
                {{ comment.message }}
            </div>
    </article>
</template>

<script>
import { mapState } from "vuex";
// import axios from 'axios';
import moment from 'moment';

export default {
    props: ['authorName', 'message', 'id', 'postId', 'authorId', 'date'], 
    created: function () {
      this.moment = moment;
    },
    data() {
        return {
            authorProfilePicture: '',
            isAlert: true,
            feedbackMessage: '',
            comments: [],
            division:'',
            messages:''
        }
    },
    // methods:{
    //     getComments() {
    //         axios.get('http://localhost:3000/postsList/get/comments/' , { 
    //                     headers: {
    //                         'Authorization': `token ${this.$store.state.tokenToCheck}`
    //                     }
    //                 })
    //         .then(response => {
    //             console.log(response)
    //             this.comments = response.data.resultat;
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    //     },
    //     postComment(id) {
    //         let syntaxe = /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{1,}$/;
    //         if(syntaxe.test(this.commentToPost)) {
    //             let comment = {
    //                 message: this.commentToPost,
    //                 postId: id,
    //                 authorName: this.$store.state.username,
    //                 authorId: this.$store.state.userId
    //             }
    //             axios.post('http://localhost:3000/postsList/post/comment', comment , { 
    //                     headers: {
    //                         'Authorization': `token ${this.$store.state.tokenToCheck}`
    //                     }
    //                 })
    //             .then(response => {
    //                 this.feedbackMessage = response.data.message;
    //                 this.isAlert = false; 
    //                 this.comments.push(this.commentToPost);
    //                 this.commentToPost = '';
    //                 setTimeout(() => {
    //                     this.feedbackMessage = ''
    //                 }, 2000);
    //                 this.getComments(id);
    //             })
    //             .catch(error => {
    //                 this.feedbackMessage = error.response.data.message; 
    //                 this.isAlert = true; 
    //             })
    //         } else {
    //             this.errorMessage = "Le message ne respecte pas la syntaxe autorisée";
    //             return;
    //         }
    //     }
    // },
    computed: {
    ...mapState([
            'tokenToCheck',
            'profilPictureS',
            'isLogged'
        ]),
    },
    mounted(){
        this.getComments()
    }
}
</script>

<style scoped>

</style>