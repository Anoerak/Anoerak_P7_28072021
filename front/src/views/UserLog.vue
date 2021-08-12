<template>
  <div class="content">
    <div class="container"><br><br>
        <div :class="{'notification is-danger is-light': isAlert, 'notification is-success is-light': !isAlert}" v-if="errorMessage != ''">{{ errorMessage }}</div>
      <div class="cartouche">
          <div class="left">
          <img :src="profile.profilPicture" width="96" height="96" alt="" style="border-radius:100%">
          <h1>{{ profile.username }} </h1>
          </div>
          <div class="middle">
            <h3>Nom : {{ profile.lastname }}</h3>
            <h4>Prénom : {{ profile.firstname }}</h4>
            <h4>Service : {{ profile.division }}</h4>
          </div>
          <div class="right">
            <h4>Accès : {{ profile.privileges }}</h4>
            <form>
                <div class="field">
                    <div class="control">
                        <input class="input" id="userAcces" type="text" placeholder="'admin' ou 'user'" autofocus="" v-model="v$.userAccess.$model" />
                          <div class="input-errors" v-for="(error, index) of v$.userAccess.$errors" :key="index">
                            <div class="help is-danger">{{ error.$message }}</div>
                          </div>
                    </div>
                </div>
                    <button class="button is-block is-success" :disabled="v$.$invalid" @click.prevent="modifyPrivileges">Modifier les droits</button>        
              </form>
          </div>
      </div>
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
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import Post from '../components/PostCard.vue'

export function validPrivileges(name) {
  let validNamePattern = new RegExp("^(admin|user)*$");
  if (validNamePattern.test(name)){
    return true;
  }
  return false;
}

export default {
    setup () {
    return { v$: useVuelidate () }
  },
  data() {
    return {
      errorMessage:'',
      userAccess: '',
      isAlert: false,
      posts: [],
      profile: {
        userIdCode:'',
        lastname:'',
        firstname:'',
        username: '',
        division:'',
        privileges:'', 
        profilPicture: '',
      }
    }
  },
  components: {
    Post
  },
  methods: {
    displayPostsFromUser() {
      let id = parseInt(this.$route.params.id, 10);
      // console.log(id);
      if(Number.isInteger(id))
      {
          axios.get('http://localhost:3000/user/'+id+'/getAllPosts/' , { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
            .then(response => {
                // console.log(response.data);
                this.posts = response.data;
            })
            .catch(error => {
                console.log(error);
            })
      }
      else console.log('NaN');
    },
    getUserInfos() {
      let id = parseInt(this.$route.params.id, 10);
      // console.log(id);

      axios.get('http://localhost:3000/user/getInfos/'+id, { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
              // console.log(response.data[0].id)
                this.profile.userIdCode = response.data[0].id;
                this.profile.lastname = response.data[0].lastname;
                this.profile.firstname = response.data[0].firstname;
                this.profile.username = response.data[0].username;
                this.profile.profilPicture = response.data[0].profilPicture;
                this.profile.division = response.data[0].division;
                this.profile.privileges = response.data[0].privileges;
            })
            .catch(error => {
                console.log(error);
            })
    },
    modifyPrivileges() {
        let userId = parseInt(this.$route.params.id, 10);
        let data = {
            userId: this.$store.state.userId, 
            newPrivilegesId: parseInt(this.$route.params.id, 10),
            privileges: this.$store.state.privilegesS,
            newPrivileges: this.userAccess,            
          }
        console.log(data);
        axios.put('http://localhost:3000/admin/modifyPrivileges/'+ userId, data , { headers: {
            'Authorization': `token ${this.$store.state.tokenToCheck}`
            }})
        .then(response => {
            this.feedbackMessage = response.data.message;
            this.isAlert = false; 
            setTimeout(() => {
              this.$router.go('')  
            }, 2000)
        })
        .catch(error => {
            console.log(error.response.data.message);
            this.feedbackMessage = error.response.data.message;
            this.isAlert = true;
            setTimeout(() => {
              this.$router.go()  
            }, 2000)
        })
    },
  },
  validations () {
    return {
      userAccess: {
        required,
          privilege_validation: {
            $validator: validPrivileges,
            $message: 'entrer uniquement "admin" ou "user"',
        }
      }
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
.cartouche{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
 .button{
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
}

</style>