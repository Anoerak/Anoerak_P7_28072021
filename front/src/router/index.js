import { createRouter, createWebHistory } from 'vue-router'

import login from '../views/Login.vue'
import About from '../views/About.vue'
import Register from '../views/Register.vue'
import PostsList from '../views/PostsList.vue'
import PostSingle from '../views/PostSingle.vue'
import PostCreate from '../views/PostCreate.vue'
import UserAccount from '../views/UserAccount.vue'
import PostComment from '../components/PostComments.vue'

import Admin from '../views/Admin'



export default createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: login,
      title: 'Groupomania'
    },
    {
      path: '/about',
      name: 'A propos',
      component: About
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      title: 'Groupomania - register'
    },
    {
      path: '/userAccount',
      name: 'UserAccount',
      component: UserAccount
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/postslist',
      name: 'PostsList',
      component: PostsList
    },
    {
      path: '/post/:id',
      name: 'postSingle',
      component: PostSingle
    },
    {
      path: '/create',
      name: 'Create',
      component: PostCreate
    },
    {
      path: '/post/:id/comment',
      name: 'postComments',
      component: PostComment
    }
  ]
})