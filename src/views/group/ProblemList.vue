<template>
  <v-card>
    <v-card-title>Problems</v-card-title>
    <template v-if="problems.length">
      {{ problems }}
    </template>
    <template v-else>
      <v-card-text>
        No problems
      </v-card-text>
    </template>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ProblemList extends Vue {
  @Prop()
  groupId!: string

  loading!: boolean
  problems = [] as any[]

  mounted() {
    this.$store.commit(M_PATH_PUSH, { text: 'Problems', to: `/group/${this.groupId}/problems/` })
    this.$on('hook:beforeDestroy', () => {
      this.$store.commit(M_PATH_POP)
    })
    this.load()
  }

  async load() {
    this.loading = true
    this.problems = await api.group.listProblems(this.groupId)
    this.loading = false
  }
}
</script>
