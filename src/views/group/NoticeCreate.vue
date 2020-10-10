<template>
  <v-card>
    <v-card-text>
      <v-text-field label="name" v-model="name" />
      <v-text-field label="display name" v-model="disp" />
      <v-textarea label="content" v-model="desc" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="submit" :loading="loading">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class NoticeCreate extends Vue {
  @Prop()
  groupId!: string

  loading = false
  name = ''
  disp = ''
  desc = ''

  created() {
    this.$store.commit(M_PATH_PUSH, { text: 'Create Notice', to: `/group/${this.groupId}/notice/new` })
  }

  async submit() {
    this.loading = true
    await api.notice.createInGroup(this.groupId, this.name, this.disp, this.desc)
    this.loading = false
  }
}
</script>
