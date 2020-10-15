<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card flat>
        <v-card-actions>
          <v-btn color="primary" block :to="`${currentURL}/new`">
            <v-icon left>mdi-send</v-icon>
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card flat>
        WIP
      </v-card>
    </v-col>
  </v-row>
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
export default class SubmissionList extends Vue {
  problemVm = {} as any

  created() {
    this.problemVm = getParent(this, Problem)
    this.$store.commit(M_PATH_PUSH, { text: 'Submission: List', to: this.currentURL })
  }

  get problem() {
    return this.problemVm.problem
  }

  get currentURL() {
    return this.problemVm.currentURL + '/submission'
  }
}
</script>
