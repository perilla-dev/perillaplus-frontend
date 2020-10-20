<template>
  <v-card>
    <v-card-text>
      <v-text-field label="name" v-model="name" />
      <v-switch label="public" v-model="pub" :prepend-icon="pub ? 'mdi-lock-open-outline' : 'mdi-lock-outline'" />
      <type-selector v-model="typeId" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="submit" :loading="loading" :disabled="!canSubmit" color="primary">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { toastSuccess } from '@/plugins/izitoast'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'
import { Component, Prop, Vue } from 'vue-property-decorator'
import TypeSelector from '@/components/TypeSelector.vue'

@Component({
  components: { TypeSelector },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class ProblemCreate extends Vue {
  @Prop()
  groupId!: string

  loading = false
  name = ''
  typeId = ''
  pub = true

  get canSubmit() {
    return this.name && this.typeId
  }

  created() {
    this.$store.commit(M_PATH_PUSH, { text: 'Create Problem', to: `/group/${this.groupId}/problem/new` })
  }

  async submit() {
    this.loading = true
    const id = await api.problem.createInGroup(api.state.userId!, this.groupId, this.typeId, this.name, this.pub)
    toastSuccess('Created problem ' + this.name)
    this.$router.push(`/group/${this.groupId}/problem/${id}`)
    this.loading = false
  }
}
</script>
