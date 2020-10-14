<template>
  <v-card-text>
    <markup :code="problem.data" language="json" />
  </v-card-text>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Markup from '@/components/vuetify/Markup.vue'
import { getParent } from '@/plugins/misc'
import Problem from '@/views/group/Problem.vue'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'

@Component({
  components: { Markup },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class ProblemData extends Vue {
  problemVm = {} as any

  created() {
    this.problemVm = getParent(this, Problem)
    this.$store.commit(M_PATH_PUSH, { text: 'Data', to: this.currentURL })
  }

  get currentURL() {
    return this.problemVm.currentURL + '/data'
  }

  get problem() {
    return this.problemVm.problem
  }
}
</script>
