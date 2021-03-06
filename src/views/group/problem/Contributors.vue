<template>
  <v-card flat :loading="loading">
    <template v-if="groupAdmin">
      <v-card-text>
        <v-text-field label="user-id" v-model="newUserId" />
        <v-btn color="primary" @click="add" :disabled="loading">Add</v-btn>
        <v-btn v-if="!hasMe" @click="addMe" :disabled="loading">Add Me</v-btn>
      </v-card-text>
      <v-divider />
    </template>
    <template v-if="problem.contributors && problem.contributors.length">
      <v-list>
        <v-list-item v-for="(contributor, i) in problem.contributors" :key="i">
          <v-list-item-avatar>
            <gravatar :email="contributor.user.email" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ contributor.user.disp }}</v-list-item-title>
          </v-list-item-content>
          <template v-if="groupAdmin">
            <v-list-item-action>
              <v-btn icon @click="remove(contributor.id)" :disabled="loading">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </template>
    <template v-else>
      <v-card-text>
        No contributors
      </v-card-text>
    </template>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { Component, Vue } from 'vue-property-decorator'
import { getParent } from '@/plugins/misc'
import Gravatar from '@/components/Gravatar.vue'
import Problem from '@/views/group/Problem.vue'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'

@Component({
  components: { Gravatar },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class ProblemContributors extends Vue {
  problemVm = {} as any
  newUserId = ''
  loading = false

  created() {
    this.problemVm = getParent(this, Problem)
    this.$store.commit(M_PATH_PUSH, { text: 'Contributors', to: this.currentURL })
  }

  get currentURL() {
    return this.problemVm.currentURL + '/contributors'
  }

  get problem() {
    return this.problemVm.problem
  }

  get groupAdmin() {
    return this.problemVm.groupAdmin
  }

  async add() {
    this.loading = true
    await api.problem.addContributor(this.problem.id, this.newUserId)
    this.problem.contributors = await api.problem.listContributors(this.problem.id)
    this.loading = false
  }

  async addMe() {
    this.loading = true
    await api.problem.addContributor(this.problem.id, api.state.userId!)
    this.problem.contributors = await api.problem.listContributors(this.problem.id)
    this.loading = false
  }

  async remove(id: string) {
    this.loading = true
    await api.problem.removeContributor(id)
    this.problem.contributors = await api.problem.listContributors(this.problem.id)
    this.loading = false
  }

  get hasMe() {
    return this.problem && this.problem.contributors && this.problem.contributors.some((x: any) => x.user.id === api.state.userId)
  }
}
</script>
