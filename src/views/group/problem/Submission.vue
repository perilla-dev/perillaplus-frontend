<template>
  <v-card flat :loading="loading">
    <v-card-title> Submission: {{ submission.id }} </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getParent } from '@/plugins/misc'
import Problem from '@/views/group/Problem.vue'
import { api } from '@/api'

@Component
export default class Submission extends Vue {
  @Prop()
  submissionId!: string

  problemVm = {} as any
  submission = {} as any
  loading = false

  created() {
    this.problemVm = getParent(this, Problem)
    this.load()
  }

  get problem() {
    return this.problemVm.problem
  }

  async load() {
    this.loading = true
    this.submission = await api.submission.get(this.submissionId)
    this.loading = false
  }
}
</script>
