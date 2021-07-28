<template>
    <article class="message">
            <div class="message-header">
                <p>{{ post.author}} le {{post.date}} à {{post.time}}</p>
                <p>{{ post.division}}</p>
            </div>
            <div class="message-body">
                {{post.message}}
            </div>
    </article>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed:{
    ...mapState(['comments', 'comment'])
  },
    created() {
    const ID = Number(this.$route.params.id);
    let post = this.comments.find(comments => comments.id === ID);
    this.post = post;
  }

}
</script>

<style scoped>

</style>