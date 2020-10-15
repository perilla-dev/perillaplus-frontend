<template>
  <v-container> </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getParent } from '@/plugins/misc'
import Problem from '@/views/group/Problem.vue'

@Component
export default class Submission extends Vue {
  problemVm = {} as any

  created() {
    this.problemVm = getParent(this, Problem)
  }

  get problem() {
    return this.problemVm.problem
  }
}
</script>
