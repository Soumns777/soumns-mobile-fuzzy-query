import Vue from 'vue'
import VueRouter from 'vue-router'
import user from '@/router/user'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    redirect: '/home'
  }
]

routes = [...routes, ...user]

// console.log(routes, '--->route')

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
