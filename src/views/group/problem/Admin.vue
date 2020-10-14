<template>
  <v-card flat :loading="loading">
    <v-tabs vertical>
      <v-tab key="basic">
        Basic
      </v-tab>
      <v-tab-item key="basic">
        <v-card-text>
          <v-text-field label="ID" v-model="problem.id" disabled />
          <v-text-field label="name" v-model="problem.name" />
          <v-text-field label="display name" v-model="problem.disp" />
          <v-textarea label="description" v-model="problem.desc" />
          <v-text-field label="type" v-model="problem.type" />
          <v-switch label="public" v-model="problem.pub" :prepend-icon="problem.pub ? 'mdi-lock-open-outline' : 'mdi-lock-outline'" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" :disabled="loading" @click="reset">
            Reset
          </v-btn>
          <v-btn color="primary" :disabled="loading" @click="submit">
            Submit
          </v-btn>
        </v-card-actions>
      </v-tab-item>

      <v-tab key="data">
        Data
      </v-tab>
      <v-tab-item key="data">
        <monaco-editor v-model="problemData" language="json" style="height: 500px;" />
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" :disabled="loading" @click="resetData">
            Reset
          </v-btn>
          <v-btn color="primary" :disabled="loading" @click="submitData">
            Submit
          </v-btn>
        </v-card-actions>
      </v-tab-item>

      <v-tab key="actions">
        Actions
      </v-tab>
      <v-tab-item key="actions">
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-card outlined>
                <v-card-title>
                  Danger zone
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { Component, Vue } from 'vue-property-decorator'
import { getParent } from '@/plugins/misc'
import MonacoEditor from '@/components/MonacoEditor.vue'
import Problem from '@/views/group/Problem.vue'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'

@Component({
  components: { MonacoEditor },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class ProblemAdmin extends Vue {
  problemVm = {} as any
  loading = false
  problemData = ''

  created() {
    this.problemVm = getParent(this, Problem)
    this.$store.commit(M_PATH_PUSH, { text: 'Admin', to: this.currentURL })
    this.resetData()
  }

  get problem() {
    return this.problemVm.problem
  }

  set problem(val) {
    this.problemVm.problem = val
  }

  get currentURL() {
    return this.problemVm.currentURL + '/admin'
  }

  async reset() {
    this.loading = true
    this.problem = await api.problem.get(this.problem.id)
    this.resetData()
    this.loading = false
  }

  async submit() {
    this.loading = true
    await api.problem.update(
      this.problem.id,
      this.problem.name,
      this.problem.disp,
      this.problem.desc,
      undefined,
      this.problem.type,
      this.problem.tags,
      this.problem.pub
    )
    this.loading = false
  }

  resetData() {
    this.problemData = this.problem.data
  }

  async submitData() {
    this.loading = true
    await api.problem.update(this.problem.id, undefined, undefined, undefined, this.problemData)
    this.loading = false
  }
}
</script>
