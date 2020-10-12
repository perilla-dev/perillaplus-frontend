import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Group from '@/views/Group.vue'
import User from '@/views/User.vue'
import Login from '@/views/Login.vue'
import About from '@/views/About.vue'
import { groupRoutes } from './group'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/group/:groupId',
    component: Group,
    props: route => ({ ...route.params }),
    children: groupRoutes
  },
  {
    path: '/user/:userId',
    component: User,
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
