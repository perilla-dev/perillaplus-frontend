<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card :loading="loading">
        <v-row no-gutters>
          <v-col cols="4">
            <v-card-title>My groups</v-card-title>
            <v-list>
              <v-list-item v-for="(group, i) in groups" :key="i" :to="`/group/${group.group.id}`">
                <v-list-item-avatar>
                  <gravatar :email="group.group.email" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ group.group.disp }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-divider vertical />
          <v-col>
            <v-card-title>Notifications</v-card-title>
            <v-card-text>
              WIP
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { NavigationGuardNext, Route } from 'vue-router'
import { api } from '@/api'
import Gravatar from '@/components/Gravatar.vue'

@Component({
  components: { Gravatar },
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    api.state.userId ? next() : next('/login')
  }
})
export default class Home extends Vue {
  loading = false

  groups = [] as any[]

  created() {
    this.loadGroups()
  }

  async loadGroups() {
    this.loading = true
    this.groups = await api.user.listGroups(api.state.userId!)
    this.loading = false
  }
}
</script>
