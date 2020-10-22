<template>
  <v-card-text>
    <markup :code="JSON.stringify(problem, null, '  ')" language="json" />
  </v-card-text>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getParent } from '@/plugins/misc'
import Markup from '@/components/vuetify/Markup.vue'
import Problem from '@/views/group/Problem.vue'

@Component({ components: { Markup } })
export default class ProblemRaw extends Vue {
  problemVm = {} as any

  created() {
    this.problemVm = getParent(this, Problem)
  }

  get problem() {
    return this.problemVm.problem
  }
}
</script>
