<template>
  <v-card-text>
    <template v-if="problem.desc">
      <md>{{ problem.desc }}</md>
    </template>
    <template v-else>
      No content
    </template>
  </v-card-text>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Md from '@/components/vuetify/Md.vue'
import { getParent } from '@/plugins/misc'
import Problem from '@/views/group/Problem.vue'

@Component({ components: { Md } })
export default class ProblemHome extends Vue {
  problemVm = {} as any

  created() {
    this.problemVm = getParent(this, Problem)
  }

  get problem() {
    return this.problemVm.problem
  }
}
</script>
