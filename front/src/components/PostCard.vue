<template>
  <div class="post-card">
    <router-link :to="'/post/' + id +'/'+ authorId">
      <div class="card" :style="{'margin':'0.5rem'}">
        <div class="card-content" :style="{ 'background-image': 'url(' + image + ')' }">
          <h2 class="has-text-weight-bold">{{ title }}</h2>
                <span class="tag is-danger" v-if="nbcomments >0">{{ nbcomments }}</span>
          <span class="category">{{ category }}</span>
        </div>
      </div>
      <p>Posté le {{ moment(date).format('DD.MM.YYYY') }} par {{ authorName }}</p>
    </router-link>
  </div>
</template>


<script>
import axios from 'axios';
import moment from 'moment';

export default {
    props: ['image', 'title', 'date', 'category', 'nbcomments', 'id', 'authorId'],
    created: function () {
      this.moment = moment;
    },
    data() {
        return {
            authorName: '',
            feedbackMessage: '',
        }
    },
    methods : {
        getInfos(authorId) {
            axios.get('http://localhost:3000/user/getInfos/' + authorId, { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
            .then(result => {
                    this.authorName = result.data[0].username;
            })
            .catch(error => {
                console.log('author : '+error)
            })
        },
    }, 
    mounted() {
        this.getInfos(this.authorId);
    },
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
      .category {
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
      .tag {
        position: absolute;
        right: -10px;
        top: -10px;
        border-radius: 100vw;
        width: 25px;
        height: 25px;
        color: #FFF;
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