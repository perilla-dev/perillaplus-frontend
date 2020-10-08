import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Group from '@/views/Group.vue'
import Login from '@/views/Login.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/group/:groupId',
    component: Group,
    props: route => ({ ...route.params })
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/about',
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
