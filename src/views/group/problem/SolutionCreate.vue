<template>
  <v-sheet>
    <v-row>
      <v-col cols="4">
        <v-sheet class="fill-height">
          <v-card-title>Data</v-card-title>
          <monaco language="json" v-model="data" style="height: 85%;" />
        </v-sheet>
      </v-col>
      <v-divider vertical />
      <v-col>
        <v-sheet>
          <v-card-text>
            <v-file-input label="file" v-model="file" />
            <v-text-field label="path" v-model="path" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn :color="pub ? 'primary' : 'warning'" @click="pub = !pub" icon>
              <v-icon>{{ pub ? 'mdi-lock-open-outline' : 'mdi-lock-outline' }}</v-icon>
            </v-btn>
            <v-btn color="primary" @click="add" :disabled="loading || !file || !path">Add</v-btn>
          </v-card-actions>
          <v-divider />
          <template v-if="files.length">
            <v-list>
              <v-list-item v-for="(file, i) in files" :key="i">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-badge :icon="file.pub ? 'mdi-lock-open-outline' : 'mdi-lock-outline'" :color="file.pub ? 'primary' : 'warning'">
                      {{ file.path }}
                    </v-badge>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-menu :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="file.pub = !file.pub">
                        <v-list-item-icon>
                          <v-icon :color="file.pub ? 'primary' : 'warning'">{{ file.pub ? 'mdi-lock-open-outline' : 'mdi-lock-outline' }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{ file.pub ? 'Public' : 'Private' }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="error">mdi-delete</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </template>
          <template v-else>
            <v-card-text>
              No files added
            </v-card-text>
          </template>
        </v-sheet>
      </v-col>
    </v-row>
    <v-divider />
    <v-card-actions>
      <v-btn block color="primary" @click="submit">
        <v-icon left>mdi-send</v-icon>
        Submit
      </v-btn>
    </v-card-actions>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getParent } from '@/plugins/misc'
import { SolutionFileDTO } from '@/api/solution'
import { api } from '@/api'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'
import Problem from '@/views/group/Problem.vue'
import Monaco from '@/components/MonacoEditor.vue'

@Component({
  components: { Monaco },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class SolutionCreate extends Vue {
  problemVm = {} as any
  data = ''
  files: SolutionFileDTO[] = []

  file: File | null = null
  path = ''
  pub = false
  loading = false

  created() {
    this.problemVm = getParent(this, Problem)
    this.$store.commit(M_PATH_PUSH, { text: 'Solution: Create', to: `${this.problemVm.currentURL}/solution/new` })
  }

  get problem() {
    return this.problemVm.problem
  }

  async add() {
    this.loading = true
    const rawId = await api.upload(this.file!)
    this.files.push({
      rawId,
      path: this.path,
      pub: this.pub
    })
    this.loading = false
  }

  async submit() {
    this.loading = true
    const id = await api.solution.createInProblem(this.problem.id, this.data, this.pub, this.files)
    this.$router.push(`${this.problemVm.currentURL}/solution/${id}`)
    this.loading = false
  }

  @Watch('file')
  onFileChanged() {
    if (this.file && !this.path) {
      this.path = this.file.name
    }
  }
}
</script>
