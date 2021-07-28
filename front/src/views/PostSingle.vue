<template>
  <div class="post-single">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ post.name }}
          </h1>
          <h2 class="subtitle ">
            <strong>Date:</strong> {{ post.date }}
            <br>
            <strong>Heure:</strong> {{ post.time }}
          </h2>
        </div>
      </div>
    </section>
    <section class="post-content">
      <div class="container">
        <p class="is-size-4 description">{{ post.description }}</p>
        <p class="is-size-5"><strong>Division:</strong> {{ post.division }}</p>
        <p class="is-size-5"><strong>Catégorie:</strong> {{ post.category }}</p>
        <p class="is-size-5"><strong>Auteur:</strong> {{ post.author }}</p>
        <div class="post-images columns is-multiline has-text-centered">
          <div v-for="image in post.images" 
                :key="image.id" 
                class="column is-one-third">
            <img :src="image" :alt="post.name"/>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div id="test">
        <button class="button is-info  is-pulled-right" @click="show = !show">Poster un commentaire</button>
          <h2 class="subtitle is-4">Vos commentaires</h2>
              <Comment />
          <Commentaires 
          v-for="comment in comments"
          :comment="comment"
          :key="comment.id"
          />
      </div>
    </section>
  </div>
</template>


<script>
import {mapState} from 'vuex'
import Commentaires from '../components/PostComments.vue' 
import Comment from '../components/Comment.vue'

export default {
  components: {
    Commentaires,
    Comment
  },
  computed:{
    ...mapState(['article', 'posts', 'comment', 'comments'])
  },
  created() {
    const ID = Number(this.$route.params.id);
    let post = this.posts.find(article => article.id === ID);
    this.post = post;
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