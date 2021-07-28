<template>
  <div class="post-card">
    <div class="card">
      <div class="card-content" v-bind:style="{ 'background-image': 'url(' + post.images + ')' }">
        <h2 class="has-text-weight-bold">{{ post.name }}</h2>
        <small class="post-date">{{ post.date }}</small>
        <span>{{ post.division }}</span>
      </div>
    </div>
  </div>
</template>


<script>
import {mapState} from 'vuex'

export default {
  props: [
    'post'
  ],
  computed:{
    ...mapState(['article', 'posts'])
  }
}
</script>


<style lang="scss" scoped>
  .card {
    height: 200px;
    background-position: center;
    background-size: cover;
    text-align: center;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.30), 3px 3px 6px rgba(0, 0, 0, 0.15);
    transition: 300ms ease-in-out;
    border-radius: 10px;
    border: 1px black solid;
    &:hover{
      box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.30), 3px 3px 12px rgba(0, 0, 0, 0.15);
    }
    &-content {
      padding-top: 50px;
      position: absolute;
      color: #FFF;
      text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
      background-color: rgba(0, 0, 0, 0.05);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      background-blend-mode: darken;
      border-radius: 15px;
      top: 0;
      padding: 10px;
      height: 200px;
      width: 100%;
      span {
        font-size: 18px;
        text-align: center;
        color: #FFF;
        background-color: rgba(0, 0, 0, 0.500);
        font-weight: bolder;
        width: 100%;
        position: absolute;
        border-radius: 0 0 10px 10px;
        bottom: 0px;
        right: 0;
      }
      h2 {
        font-size: 1.25rem;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        border-radius: 10px 10px 0 0;
        background-color: rgba(0, 0, 0, 0.500);
      }
    }
  }
  .post-date {
    background-color: #151515;
    color: #FFF;
    font-size: 0.90rem;
    padding: 2px 10px;
    position: absolute;
    border-radius: 0 0 10px 0;
    bottom: 0;
    right: 0;
  }
</style>