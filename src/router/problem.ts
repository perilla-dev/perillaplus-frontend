import { RouteConfig } from 'vue-router'

export const problemRoutes: Array<RouteConfig> = [
  {
    path: '',
    component: () =>
      import(
        /* webpackChunkName: 'problem' */
        '@/views/group/problem/Home.vue'
      ),
    props: true
  },
  {
    path: 'raw',
    component: () =>
      import(
        /* webpackChunkName: 'problem' */
        '@/views/group/problem/Raw.vue'
      ),
    props: true
  },
  {
    path: 'data',
    component: () =>
      import(
        /* webpackChunkName: 'problem' */
        '@/views/group/problem/Data.vue'
      ),
    props: true
  },
  {
    path: 'files',
    component: () =>
      import(
        /* webpackChunkName: 'problem' */
        '@/views/group/problem/Files.vue'
      ),
    props: true
  },
  {
    path: 'submissions',
    component: () =>
      import(
        /* webpackChunkName: 'problem' */
        '@/views/group/problem/Submissions.vue'
      )
  },
  {
    path: 'contributors',
    component: () =>
      import(
        /* webpackChunkName: 'problem' */
        '@/views/group/problem/Contributors.vue'
      ),
    props: true
  },
  {
    path: 'admin',
    component: () =>
      import(
        /* webpackChunkName: 'problem' */
        '@/views/group/problem/Admin.vue'
      ),
    props: true
  }
]
