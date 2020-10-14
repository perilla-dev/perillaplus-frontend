<template>
  <v-card flat :loading="loading">
    <template v-if="problemAdmin">
      <v-card-text>
        <v-file-input label="file" v-model="file" />
        <v-text-field label="path" v-model="path" />
        <v-switch label="public" v-model="pub" />
        <v-btn color="primary" @click="add" :disabled="loading || !file">Add</v-btn>
      </v-card-text>
      <v-divider />
    </template>
    <template v-if="problem.files && problem.files.length">
      <v-list>
        <v-list-item v-for="(file, i) in problem.files" :key="i">
          <v-list-item-content>
            <v-list-item-title>
              <v-badge :icon="file.pub ? 'mdi-lock-open-outline' : 'mdi-lock-outline'" :color="file.pub ? 'primary' : 'error'">
                {{ file.path }}
              </v-badge>
            </v-list-item-title>
          </v-list-item-content>
          <template v-if="problemAdmin">
            <v-list-item-action>
              <v-btn icon @click="remove(file.id)" :disabled="loading">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </template>
    <template v-else>
      <v-card-text>
        No files
      </v-card-text>
    </template>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { Component, Vue } from 'vue-property-decorator'
import { toastError } from '@/plugins/izitoast'
import { getParent } from '@/plugins/misc'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'
import Problem from '@/views/group/Problem.vue'

@Component({
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class ProblemFiles extends Vue {
  problemVm = {} as any
  loading = false
  file: File | null = null
  path = ''
  pub = true

  created() {
    this.problemVm = getParent(this, Problem)
    this.$store.commit(M_PATH_PUSH, { text: 'Files', to: this.currentURL })
  }

  get currentURL() {
    return this.problemVm.currentURL + '/files'
  }

  get problem() {
    return this.problemVm.problem
  }

  get problemAdmin() {
    return this.problemVm.problemAdmin
  }

  async add() {
    this.loading = true
    const rawId = await api.upload(this.file!)
    await api.file.createInProblem(this.problem.id, rawId, this.path, this.pub)
    this.problem.files = await api.file.listByProblem(this.problem.id)
    this.loading = false
  }

  async remove(id: string) {
    this.loading = true
    await api.file.remove(id)
    this.loading = false
  }

  errorCaptured(err: Error) {
    toastError(err.message)
    this.loading = false
    return false
  }
}
</script>
