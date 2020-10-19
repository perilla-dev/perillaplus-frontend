<template>
  <v-card flat :loading="loading">
    <v-card-title> Solution: {{ solution.id }} </v-card-title>
    <v-divider />
    <v-tabs vertical>
      <v-tab>
        Status
      </v-tab>
      <v-tab-item> Server state: {{ solution.state }} </v-tab-item>
      <v-tab>
        Data
      </v-tab>
      <v-tab-item>
        <markup :code="solution.data" language="json" />
      </v-tab-item>
      <v-tab>
        Details
      </v-tab>
      <v-tab-item>
        <markup :code="solution.details" language="json" />
      </v-tab-item>
      <v-tab>
        Files
      </v-tab>
      <v-tab-item>
        <template v-if="solution.files && solution.files.length">
          <v-list>
            <v-list-item v-for="(file, i) in solution.files" :key="i">
              <v-list-item-content>
                <v-list-item-title>
                  <v-badge :icon="file.pub ? 'mdi-lock-open-outline' : 'mdi-lock-outline'" :color="file.pub ? 'primary' : 'warning'">
                    {{ file.path }}
                  </v-badge>
                </v-list-item-title>
              </v-list-item-content>
              <v-btn icon>
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
        </template>
        <template v-else>
          <v-card-text>
            No files
          </v-card-text>
        </template>
      </v-tab-item>
      <v-tab>
        Raw
      </v-tab>
      <v-tab-item>
        <markup :code="JSON.stringify(solution, null, '  ')" language="json" />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getParent } from '@/plugins/misc'
import { api } from '@/api'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'
import Problem from '@/views/group/Problem.vue'
import Markup from '@/components/vuetify/Markup.vue'

@Component({
  components: { Markup },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class Solution extends Vue {
  @Prop()
  solutionId!: string

  problemVm = {} as any
  solution = {} as any
  loading = false

  created() {
    this.problemVm = getParent(this, Problem)
    this.$store.commit(M_PATH_PUSH, { text: `Solution: ${this.solutionId}`, to: this.currentURL })
    this.load()
  }

  get problem() {
    return this.problemVm.problem
  }

  get currentURL() {
    return this.problemVm.currentURL + '/solution/' + this.solutionId
  }

  async load() {
    this.loading = true
    this.solution = await api.solution.get(this.solutionId)
    this.loading = false
  }
}
</script>
