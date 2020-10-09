<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card :loading="loading">
        <v-card-title>
          <div>
            <div>{{ group.disp }}</div>
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
          <v-tab :to="`/group/${groupId}/`" exact>
            Home
          </v-tab>
          <v-tab :to="`/group/${groupId}/problems`" exact>
            Problems
          </v-tab>
          <v-tab :to="`/group/${groupId}/competitions`" exact disabled>
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
import { M_PATH_POP, M_PATH_PUSH } from '@/store'
import { api } from '@/api'
import Gravatar from '@/components/Gravatar.vue'
import { NavigationGuardNext, Route } from 'vue-router'

@Component({
  components: { Gravatar },
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    api.state.userId ? next() : next('/login')
  }
})
export default class Group extends Vue {
  @Prop()
  groupId!: string

  loading = false

  group = {} as any

  mounted() {
    this.$store.commit(M_PATH_PUSH, { text: this.groupId, to: `/group/${this.groupId}` })
    this.$on('hook:beforeDestroy', () => {
      this.$store.commit(M_PATH_POP)
    })
    this.loadData()
  }

  async loadData() {
    this.loading = true
    this.group = await api.group.get(this.groupId)
    this.$store.commit(M_PATH_POP)
    this.$store.commit(M_PATH_PUSH, { text: this.group.disp, to: `/group/${this.groupId}` })
    this.loading = false
  }
}
</script>
