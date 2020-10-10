<template>
  <v-card :loading="loading">
    <v-card-title>
      <div>
        <v-badge :icon="problem.pub ? 'mdi-lock-open-outline' : 'mdi-lock-outline'" :color="problem.pub ? 'primary' : 'error'">
          <div>{{ problem.disp }}</div>
        </v-badge>
        <div class="subtitle-1">
          <code>{{ problem.name }}</code>
        </div>
        <div class="subtitle-1">
          <code>{{ problem.type }}</code>
        </div>
      </div>
    </v-card-title>
    <v-divider />
    <v-tabs>
      <v-tab key="desc">
        Description
      </v-tab>
      <v-tab-item key="desc">
        <v-card-text>
          <template v-if="problem.desc">
            <md>{{ problem.desc }}</md>
          </template>
          <template v-else>
            No content
          </template>
        </v-card-text>
      </v-tab-item>

      <v-tab key="raw">
        Raw
      </v-tab>
      <v-tab-item key="raw">
        <v-card-text>
          <markup :code="JSON.stringify(problem, null, '  ')" language="json" />
        </v-card-text>
      </v-tab-item>

      <v-tab key="data">
        Data
      </v-tab>
      <v-tab-item key="data">
        <v-card-text>
          <markup :code="JSON.stringify(problem.data, null, '  ')" language="json" />
        </v-card-text>
      </v-tab-item>

      <v-tab key="files">
        Files
      </v-tab>
      <v-tab-item key="files">
        WIP
      </v-tab-item>

      <v-tab key="submissions">
        Submissions
      </v-tab>
      <v-tab-item key="submissions">
        WIP
      </v-tab-item>

      <template v-if="admin">
        <v-tab key="admin">
          Admin
        </v-tab>
        <v-tab-item>
          <problem-admin :problemId="problemId" />
        </v-tab-item>
      </template>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import { api, MemberRole } from '@/api'
import { M_PATH_POP, M_PATH_PUSH, M_PATH_REPLACE } from '@/store'
import { Component, Prop, Vue } from 'vue-property-decorator'
import ZDate from '@/components/ZDate.vue'
import ProblemAdmin from '@/components/ProblemAdmin.vue'
import Markup from '@/components/vuetify/Markup.vue'
import Md from '@/components/vuetify/Md.vue'

@Component({
  components: { ZDate, ProblemAdmin, Markup, Md },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class ProblemView extends Vue {
  @Prop()
  groupId!: string
  @Prop()
  problemId!: string

  loading = false
  problem = {} as any
  member = {} as any

  created() {
    this.$store.commit(M_PATH_PUSH, { text: `Problem: ${this.problemId}`, to: this.currentURL })
    this.load()
  }

  async load() {
    this.loading = true
    this.problem = await api.problem.get(this.problemId)
    this.member = await api.group.findMember(this.groupId, api.state.userId!)
    this.$store.commit(M_PATH_REPLACE, { text: `Problem: ${this.problem.disp}`, to: this.currentURL })
    this.loading = false
  }

  get currentURL() {
    return `/group/${this.groupId}/problem/view/${this.problemId}`
  }

  get admin() {
    return this.member.role !== MemberRole.member
  }
}
</script>
