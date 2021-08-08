<template>
    <div>
        <div class="content">
            <div class="container">
            <h2> Liste des posts signalés </h2>
                <div class="userPosts">
                    <Post @postFlagged="displayAllPosts()" 
                    v-for="(post, postIndex) in posts" 
                    :key="post.id" 
                    :authorId="post.authorId" 
                    :title="post.title"
                    :nbcoments="post.nbComments"
                    :category="post.category"
                    :date="post.date"
                    :message="post.message" 
                    :image="post.image" 
                    :index="postIndex" 
                    :id="post.id">
                    </Post>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Post from '../components/PostCard.vue'

export default {
    data() {
        return {
            posts: [],
        }
    },
    methods: {
        getFlaggedPosts() {
            axios.get('http://localhost:3000/admin/flaggedPosts', { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }} )
            .then(response => {
                this.posts = response.data.resultat; 
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    components: {
        Post
    },
    mounted() {
        this.getFlaggedPosts();
    }
}
</script>

<style lang="scss" scoped>
.userPosts{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}
.post-card{
   min-width:300px;
}
a .card .card-content h2{
    color: #fff;
}
</style>