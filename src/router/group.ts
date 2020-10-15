import { RouteConfig } from 'vue-router'
import { problemRoutes } from './problem'

export const groupRoutes: Array<RouteConfig> = [
  {
    path: '',
    component: () => import('@/views/group/Home.vue'),
    props: true
  },
  {
    path: 'notice/new',
    component: () => import('@/views/group/NoticeCreate.vue'),
    props: true
  },
  {
    path: 'notice/edit/:noticeId',
    component: () => import('@/views/group/NoticeEdit.vue'),
    props: true
  },
  {
    path: 'problem',
    component: () => import('@/views/group/ProblemList.vue'),
    props: true
  },
  {
    path: 'problem/new',
    component: () => import('@/views/group/ProblemCreate.vue'),
    props: true
  },
  {
    path: 'problem/:problemId',
    component: () => import('@/views/group/Problem.vue'),
    props: true,
    children: problemRoutes
  }
]
