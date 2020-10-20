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
        <div class="subtitle-1" v-if="problem.type">
          <code>{{ problem.type.name }}</code>
        </div>
      </div>
    </v-card-title>
    <v-divider />
    <v-tabs>
      <v-tab :to="currentURL" exact>
        Description
      </v-tab>

      <v-tab :to="`${currentURL}/raw`">
        Raw
      </v-tab>

      <v-tab :to="`${currentURL}/data`">
        Data
      </v-tab>

      <v-tab :to="`${currentURL}/files`">
        Files
      </v-tab>

      <v-tab :to="`${currentURL}/solution`">
        Solutions
      </v-tab>

      <v-tab :to="`${currentURL}/contributors`">
        Contributors
      </v-tab>

      <template v-if="problemAdmin">
        <v-tab :to="`${currentURL}/admin`">
          Admin
        </v-tab>
      </template>
    </v-tabs>
    <router-view />
  </v-card>
</template>

<script lang="ts">
import { api, MemberRole } from '@/api'
import { M_PATH_POP, M_PATH_PUSH, M_PATH_REPLACE } from '@/store'
import { Component, Prop, Vue } from 'vue-property-decorator'
import ZDate from '@/components/ZDate.vue'
import { toastError } from '@/plugins/izitoast'
import { getParent } from '@/plugins/misc'
import Group from '@/views/Group.vue'

@Component({
  components: { ZDate },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class Problem extends Vue {
  @Prop()
  groupId!: string
  @Prop()
  problemId!: string

  loading = false
  problem = {} as any
  groupVm = {} as any

  created() {
    this.groupVm = getParent(this, Group)
    this.$store.commit(M_PATH_PUSH, { text: `Problem: ${this.problemId}`, to: this.currentURL })
    this.load()
  }

  async load() {
    this.loading = true
    this.problem = await api.problem.get(this.problemId)
    this.$store.commit(M_PATH_REPLACE, { text: `Problem: ${this.problem.disp}`, to: this.currentURL })
    this.loading = false
  }

  get currentURL() {
    return `/group/${this.groupId}/problem/${this.problemId}`
  }

  get groupAdmin() {
    return this.groupVm.member.role !== MemberRole.member
  }

  get problemAdmin() {
    return this.problem && this.problem.contributors && this.problem.contributors.some((x: any) => x.user.id === api.state.userId)
  }

  errorCaptured(err: Error) {
    toastError(err.message)
    this.loading = false
    return false
  }
}
</script>
