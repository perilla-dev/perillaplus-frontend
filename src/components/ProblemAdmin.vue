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

      <v-tab key="contributors">
        Contributors
      </v-tab>
      <v-tab-item key="contributors">
        WIP
      </v-tab-item>

      <v-tab key="files">
        Files
      </v-tab>
      <v-tab-item key="files">
        WIP
      </v-tab-item>

      <v-tab key="data">
        Data
      </v-tab>
      <v-tab-item key="data">
        WIP
      </v-tab-item>

      <v-tab key="actions">
        Actions
      </v-tab>
      <v-tab-item key="actions">
        WIP
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ProblemAdmin extends Vue {
  @Prop()
  problemId!: string

  loading = false
  problem = {} as any

  created() {
    this.reset()
  }

  async reset() {
    this.loading = true
    this.problem = await api.problem.get(this.problemId)
    this.loading = false
  }

  async submit() {
    this.loading = true
    this.problem = await api.problem.get(this.problemId)
    this.loading = false
  }
}
</script>
