<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-sheet>
        <v-card-actions>
          <v-btn color="primary" block :to="`${currentURL}/new`">
            <v-icon left>mdi-send</v-icon>
            Submit
          </v-btn>
        </v-card-actions>
      </v-sheet>
    </v-col>
    <v-col cols="12">
      <v-card flat :loading="loading">
        <v-data-table :headers="headers" :items="submissions">
          <template v-slot:[`item.id`]="{ item }">
            <router-link :to="`${currentURL}/${item.id}`">
              <code>{{ item.id }}</code>
            </router-link>
          </template>
          <template v-slot:[`item.pub`]="{ item }">
            <v-icon :color="item.pub ? 'primary' : 'warning'">{{ item.pub ? 'mdi-lock-open-outline' : 'mdi-lock-outline' }}</v-icon>
          </template>
          <template v-slot:[`item.user`]="{ item }">
            <v-chip>
              <v-avatar left>
                <gravatar :email="item.user.email" />
              </v-avatar>
              {{ item.user.disp }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getParent } from '@/plugins/misc'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'
import { api } from '@/api'
import Markup from '@/components/vuetify/Markup.vue'
import Problem from '@/views/group/Problem.vue'
import Gravatar from '@/components/Gravatar.vue'

@Component({
  components: { Markup, Gravatar },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class SubmissionList extends Vue {
  headers = [
    { text: 'ID', value: 'id' },
    { text: 'state', value: 'state' },
    { text: 'status', value: 'status' },
    { text: 'pub', value: 'pub' },
    { text: 'user', value: 'user' }
  ]

  loading = false
  problemVm = {} as any
  submissions = [] as any[]

  created() {
    this.problemVm = getParent(this, Problem)
    this.$store.commit(M_PATH_PUSH, { text: 'Submission: List', to: this.currentURL })
    this.load()
  }

  get problem() {
    return this.problemVm.problem
  }

  get currentURL() {
    return this.problemVm.currentURL + '/submission'
  }

  async load() {
    this.loading = true
    this.submissions = await api.submission.listByProblem(this.problemVm.problemId)
    this.loading = false
  }
}
</script>
