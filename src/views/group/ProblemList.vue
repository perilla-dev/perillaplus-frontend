<template>
  <v-card>
    <template v-if="admin">
      <v-card-actions>
        <v-spacer />
        <v-btn outlined color="primary" :to="`${currentURL}/new`">
          <v-icon left>
            mdi-plus
          </v-icon>
          Create new
        </v-btn>
      </v-card-actions>
      <v-divider />
    </template>
    <template v-if="problems.length">
      <v-card-text>
        <v-row>
          <v-col cols="12" v-for="(problem, i) in problems" :key="i">
            <v-card outlined :to="`${currentURL}/${problem.id}`" hover>
              <v-card-title>
                {{ problem.disp }}
              </v-card-title>
              <v-card-text>
                {{ problem.desc }}
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-chip outlined small>
                  <v-icon left>
                    mdi-creation
                  </v-icon>
                  <z-date :date="problem.created" />
                </v-chip>
                <v-chip outlined small>
                  <v-icon left>
                    mdi-pencil
                  </v-icon>
                  <z-date :date="problem.updated" />
                </v-chip>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </template>
    <template v-else>
      <v-card-text>
        No problems
      </v-card-text>
    </template>
  </v-card>
</template>

<script lang="ts">
import { api, MemberRole } from '@/api'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'
import { Component, Prop, Vue } from 'vue-property-decorator'
import ZDate from '@/components/ZDate.vue'

@Component({
  components: { ZDate },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class ProblemList extends Vue {
  @Prop()
  groupId!: string

  loading = false
  problems = [] as any[]
  member = {} as any

  created() {
    this.$store.commit(M_PATH_PUSH, { text: 'Problems', to: this.currentURL })
    this.load()
  }

  async load() {
    this.loading = true
    this.problems = await api.problem.listByGroup(this.groupId)
    this.loading = false
  }

  get admin() {
    return this.member.role !== MemberRole.member
  }

  get currentURL() {
    return `/group/${this.groupId}/problem`
  }
}
</script>
