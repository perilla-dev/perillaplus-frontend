<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card :loading="loading">
        <v-card-title>
          <div>
            <v-badge :content="role">
              <div>{{ group.disp }}</div>
            </v-badge>
            <div class="subtitle-1">
              <code>{{ group.name }}</code>
            </div>
          </div>
          <v-spacer />
          <v-avatar>
            <gravatar :email="group.email" />
          </v-avatar>
        </v-card-title>
        <v-divider />
        <v-tabs>
          <v-tabs-slider></v-tabs-slider>
          <v-tab :to="`${currentURL}/`" exact>
            Home
          </v-tab>
          <v-tab :to="`${currentURL}/problem`">
            Problems
          </v-tab>
          <v-tab :to="`${currentURL}/competition`" disabled>
            Competitions
          </v-tab>
        </v-tabs>
      </v-card>
    </v-col>
    <v-col cols="12">
      <router-view />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { M_PATH_POP, M_PATH_PUSH, M_PATH_REPLACE } from '@/store'
import { api, MemberRole } from '@/api'
import Gravatar from '@/components/Gravatar.vue'

@Component({
  components: { Gravatar },
  beforeRouteEnter(to, from, next) {
    api.state.userId ? next() : next('/login')
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class Group extends Vue {
  @Prop()
  groupId!: string

  loading = false

  group = {} as any
  member = {} as any

  created() {
    this.$store.commit(M_PATH_PUSH, { text: this.groupId, to: this.currentURL })
    this.loadData()
  }

  async loadData() {
    this.loading = true
    this.group = await api.group.get(this.groupId)
    this.member = await api.group.findMember(this.groupId, api.state.userId!)
    this.$store.commit(M_PATH_REPLACE, { text: this.group.disp, to: this.currentURL })
    this.loading = false
  }

  get role() {
    return MemberRole[this.member.role]
  }

  get currentURL() {
    return `/group/${this.groupId}`
  }
}
</script>
