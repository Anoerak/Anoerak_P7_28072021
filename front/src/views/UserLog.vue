<template>
  <div class="content">
    <div class="container">
      <img :src="profile.profilPicture" width="96" height="96" alt="" style="border-radius:100%">
      <h1>{{ profile.username }} </h1>
      <h2> Liste des publications </h2>
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
</template>

<script>
import axios from 'axios'
import Post from '../components/PostCard.vue'

export default {
  data() {
    return {
      posts: [],
      profile: {
        username: '', 
        profilPicture: ''
      }
    }
  },
  components: {
    Post
  },
  methods: {
    displayPostsFromUser() {
      let id = parseInt(this.$route.params.id, 10); //Convertir en nombre par sécurité
      console.log(id);
      if(Number.isInteger(id))
      {
          axios.get('http://localhost:3000/user/'+id+'/getAllPosts/' , { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
            .then(response => {
                console.log(response.data);
                this.posts = response.data;
            })
            .catch(error => {
                console.log(error);
            })
      }
      else console.log('NaN');
    },
    getUserInfos() {
      let id = parseInt(this.$route.params.id, 10); //Convertir en nombre par sécurité
      console.log(id);

      axios.get('http://localhost:3000/user/getInfos/'+id, { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                this.profile.username = response.data[0].username;
                this.profile.profilPicture = response.data[0].profilPicture;
            })
            .catch(error => {
                console.log(error);
            })
    }
  },
  mounted() {
    this.displayPostsFromUser()
    this.getUserInfos();
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