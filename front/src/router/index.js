import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Register from '../views/Register.vue'
import PostsList from '../views/PostsList.vue'
import PostSingle from '../views/PostSingle.vue'
import PostCreate from '../views/PostCreate.vue'
import UserAccount from '../views/UserAccount.vue'
import UserLog from '../views/UserLog.vue'
import PostComments from '../components/PostComments.vue'

import Admin from '../views/Admin'
import AdminUsersList from '../components/usersList.vue'
import AdminUsersListDelete from '../components/usersListDelete.vue'
import AdminUserDelete from '../components/userDelete.vue'
import AdminFlaggedPosts from '../components/flaggedPosts'



export default createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Login,
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
      name: 'userAccount',
      component: UserAccount
    },
    {
      path:'/userLog/:id',
      name: 'userLog',
      component: UserLog
    },  
    {
      path:'/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path:'/admin/flaggedPosts',
          component: AdminFlaggedPosts
        },
        {
          path:'/admin/usersList',
          component: AdminUsersList
        },
        {
          path:'/admin/usersListDelete',
          component: AdminUsersListDelete
        },
        {
          path:'/admin/userDelete/:id',
          component: AdminUserDelete
        },
        {
          path:'/admin/register',
          component: Register
        }

      ]
    },
      {
      path: '/postslist',
      name: 'postsList',
      component: PostsList
    },
    {
      path: '/post/:id/:authorId',
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
      component: PostComments
    }
  ]
})