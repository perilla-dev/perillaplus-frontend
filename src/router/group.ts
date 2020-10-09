import { RouteConfig } from 'vue-router'
import Home from '@/views/group/Home.vue'
import ProblemList from '@/views/group/ProblemList.vue'

export const groupRoutes: Array<RouteConfig> = [
  {
    path: '',
    component: Home,
    props: true
  },
  {
    path: 'problems',
    component: ProblemList,
    props: true
  }
]
