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
    path: 'submission',
    component: () =>
      import(
        /* webpackChunkName: 'problem' */
        '@/views/group/problem/SubmissionList.vue'
      ),
    props: true
  },
  {
    path: 'submission/new',
    component: () =>
      import(
        /* webpackChunkName: 'problem' */
        '@/views/group/problem/SubmissionCreate.vue'
      ),
    props: true
  },
  {
    path: 'submission/:submissionId',
    component: () =>
      import(
        /* webpackChunkName: 'problem' */
        '@/views/group/problem/Submission.vue'
      ),
    props: true
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
