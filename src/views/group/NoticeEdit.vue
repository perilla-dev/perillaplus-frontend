<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-text-field label="ID" v-model="notice.id" disabled />
      <v-text-field label="name" v-model="notice.name" />
      <v-text-field label="display name" v-model="notice.disp" />
      <v-textarea label="content" v-model="notice.desc" />
      <v-text-field label="tags" v-model="notice.tags" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="reset" :disabled="loading" color="error">
        Reset
      </v-btn>
      <v-btn @click="submit" :disabled="loading" color="primary">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { M_PATH_POP, M_PATH_PUSH, M_PATH_REPLACE } from '@/store'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class NoticeEdit extends Vue {
  @Prop()
  groupId!: string
  @Prop()
  noticeId!: string

  loading = false
  notice = {} as any

  created() {
    this.$store.commit(M_PATH_PUSH, { text: 'Edit Notice', to: this.currentURL })
    this.reset()
  }

  async reset() {
    this.loading = true
    this.notice = await api.notice.get(this.noticeId)
    this.$store.commit(M_PATH_REPLACE, { text: `Edit Notice: ${this.notice.disp}`, to: this.currentURL })
    this.loading = false
  }

  async submit() {
    this.loading = true
    await api.notice.update(this.noticeId, this.notice.name, this.notice.disp, this.notice.desc, this.notice.tags)
    this.loading = false
  }

  get currentURL() {
    return `/group/${this.groupId}/notice/edit/${this.noticeId}`
  }
}
</script>
