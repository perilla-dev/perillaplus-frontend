import { RouteConfig } from 'vue-router'

export const problemRoutes: Array<RouteConfig> = [
  {
    path: '',
    component: () => import('@/views/group/problem/Home.vue'),
    props: true
  },
  {
    path: 'raw',
    component: () => import('@/views/group/problem/Raw.vue'),
    props: true
  },
  {
    path: 'data',
    component: () => import('@/views/group/problem/Data.vue'),
    props: true
  },
  {
    path: 'files',
    component: () => import('@/views/group/problem/Files.vue'),
    props: true
  },
  {
    path: 'contributors',
    component: () => import('@/views/group/problem/Contributors.vue'),
    props: true
  },
  {
    path: 'admin',
    component: () => import('@/views/group/problem/Admin.vue'),
    props: true
  }
]
