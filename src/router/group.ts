import { RouteConfig } from 'vue-router'
import Home from '@/views/group/Home.vue'
import ProblemList from '@/views/group/ProblemList.vue'
import NoticeCreate from '@/views/group/NoticeCreate.vue'
import NoticeEdit from '@/views/group/NoticeEdit.vue'
import ProblemCreate from '@/views/group/ProblemCreate.vue'
import ProblemView from '@/views/group/ProblemView.vue'

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
    path: 'problem/view/:problemId',
    component: ProblemView,
    props: true
  },
  {
    path: 'problem',
    component: ProblemList,
    props: true
  }
]
