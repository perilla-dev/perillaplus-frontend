<template>
  <v-card-text>
    Submissions
  </v-card-text>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Markup from '@/components/vuetify/Markup.vue'
import { getParent } from '@/plugins/misc'
import Problem from '@/views/group/Problem.vue'

@Component({ components: { Markup } })
export default class ProblemSubmissions extends Vue {
  problemVm = {} as any

  created() {
    this.problemVm = getParent(this, Problem)
  }

  get problem() {
    return this.problemVm.problem
  }
}
</script>
