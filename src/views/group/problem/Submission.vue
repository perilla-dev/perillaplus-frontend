<template>
  <v-card flat :loading="loading">
    <v-card-title> Submission: {{ submission.id }} </v-card-title>
    <v-divider />
    <v-tabs vertical>
      <v-tab>
        Status
      </v-tab>
      <v-tab-item> Server state: {{ submission.state }} </v-tab-item>
      <v-tab>
        Data
      </v-tab>
      <v-tab-item>
        <markup :code="submission.data" language="json" />
      </v-tab-item>
      <v-tab>
        Details
      </v-tab>
      <v-tab-item>
        <markup :code="submission.details" language="json" />
      </v-tab-item>
      <v-tab>
        Files
      </v-tab>
      <v-tab-item>
        <template v-if="submission.files && submission.files.length">
          <v-list>
            <v-list-item v-for="(file, i) in submission.files" :key="i">
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
        <markup :code="JSON.stringify(submission, null, '  ')" language="json" />
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
export default class Submission extends Vue {
  @Prop()
  submissionId!: string

  problemVm = {} as any
  submission = {} as any
  loading = false

  created() {
    this.problemVm = getParent(this, Problem)
    this.$store.commit(M_PATH_PUSH, { text: `Submission: ${this.submissionId}`, to: this.currentURL })
    this.load()
  }

  get problem() {
    return this.problemVm.problem
  }

  get currentURL() {
    return this.problemVm.currentURL + '/submission/' + this.submissionId
  }

  async load() {
    this.loading = true
    this.submission = await api.submission.get(this.submissionId)
    this.loading = false
  }
}
</script>
