<template>
  <v-card :loading="loading">
    <template v-if="admin">
      <v-card-actions>
        <v-spacer />
        <v-btn outlined color="primary" :to="`/group/${groupId}/notice/new`">
          <v-icon left>
            mdi-plus
          </v-icon>
          Create new
        </v-btn>
      </v-card-actions>
      <v-divider />
    </template>
    <template v-if="notices.length">
      <v-card-text>
        <v-row>
          <v-col cols="12" v-for="(notice, i) in notices" :key="i">
            <v-card outlined>
              <v-card-title>
                {{ notice.disp }}
              </v-card-title>
              <v-card-text>
                {{ notice.desc }}
              </v-card-text>
              <v-card-actions>
                <template v-if="admin">
                  <v-btn color="primary" :to="`/group/${groupId}/notice/edit/${notice.id}`">
                    <v-icon left>mdi-pencil</v-icon>
                    Edit
                  </v-btn>
                </template>
                <v-spacer />
                <v-chip outlined small>
                  <v-icon left>
                    mdi-creation
                  </v-icon>
                  <z-date :date="notice.created" />
                </v-chip>
                <v-chip outlined small>
                  <v-icon left>
                    mdi-pencil
                  </v-icon>
                  <z-date :date="notice.updated" />
                </v-chip>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </template>
    <v-card-text v-else>
      No notices!
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { api, MemberRole } from '@/api'
import { Component, Prop, Vue } from 'vue-property-decorator'
import ZDate from '@/components/ZDate.vue'

@Component({ components: { ZDate } })
export default class GroupHome extends Vue {
  @Prop()
  groupId!: string

  loading = false
  notices = [] as any[]

  created() {
    this.load()
  }

  async load() {
    this.loading = true
    this.notices = await api.notice.listByGroup(this.groupId)
    this.loading = false
  }

  get member() {
    const parent = this.$parent as any
    return parent.member
  }

  get admin() {
    return this.member.role !== MemberRole.member
  }
}
</script>
