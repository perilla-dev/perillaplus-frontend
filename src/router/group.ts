import { RouteConfig } from 'vue-router'
import Home from '@/views/group/Home.vue'
import ProblemList from '@/views/group/ProblemList.vue'
import NoticeCreate from '@/views/group/NoticeCreate.vue'
import NoticeEdit from '@/views/group/NoticeEdit.vue'
import ProblemCreate from '@/views/group/ProblemCreate.vue'
import Problem from '@/views/group/Problem.vue'
import { problemRoutes } from './problem'

export const groupRoutes: Array<RouteConfig> = [
  {
    path: '',
    component: Home,
    props: true
  },
  {
    path: 'notice/new',
    component: NoticeCreate,
    props: true
  },
  {
    path: 'notice/edit/:noticeId',
    component: NoticeEdit,
    props: true
  },
  {
    path: 'problem/new',
    component: ProblemCreate,
    props: true
  },
  {
    path: 'problem/:problemId',
    component: Problem,
    props: true,
    children: problemRoutes
  },
  {
    path: 'problem',
    component: ProblemList,
    props: true
  }
]
