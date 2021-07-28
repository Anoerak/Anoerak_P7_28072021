<template>
  <div class="posts container">
    <router-link :to="'/Create/'">
    <button class="button is-info  is-pulled-right">Ajouter votre Post</button>
    </router-link>
    <h2 class="subtitle is-3">
    Consulter les dernières publications de vos collègues.
    </h2>
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
import PostCard from '../components/PostCard';
import PostCreate from './PostCreate.vue';
import User from './UserAccount.vue'
import {mapState} from 'vuex'

export default {
  name: 'PostsList',
  components : {
   PostCard,
   // eslint-disable-next-line
   PostCreate,
  // eslint-disable-next-line
   User
  },
  computed:{
    ...mapState(['article', 'posts']),
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