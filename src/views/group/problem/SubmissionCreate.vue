<template>
  <v-card-text>
    SubmissionCreate
  </v-card-text>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getParent } from '@/plugins/misc'
import Problem from '@/views/group/Problem.vue'

@Component
export default class SubmissionCreate extends Vue {
  problemVm = {} as any

  created() {
    this.problemVm = getParent(this, Problem)
  }

  get problem() {
    return this.problemVm.problem
  }
}
</script>
