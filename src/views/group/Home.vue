<template>
  <v-card :loading="loading">
    <v-list v-if="notices.length"> </v-list>
    <v-card-text v-else>
      No notices!
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { api } from '@/api'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NoticeList extends Vue {
  @Prop()
  groupId!: string

  loading!: boolean
  notices = [] as any[]

  created() {
    this.load()
  }

  async load() {
    this.loading = true
    this.notices = await api.group.listNotices(this.groupId)
    this.loading = false
  }
}
</script>
