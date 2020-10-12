<template>
  <v-menu offset-y open-on-hover>
    <template v-slot:activator="{ on, attrs }">
      <v-btn text outlined large :loading="loading" class="text-none" v-bind="attrs" v-on="on">
        <v-avatar size="32" left>
          <gravatar :email="user.email" />
        </v-avatar>
        {{ user.disp }}
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { api } from '@/api'
import { Vue, Component } from 'vue-property-decorator'
import Gravatar from '@/components/Gravatar.vue'

@Component({ components: { Gravatar } })
export default class UserIndicatorLoggedIn extends Vue {
  loading = false
  user = {} as any

  created() {
    this.load()
  }

  async load() {
    this.loading = true
    this.user = await api.user.get(api.state.userId!)
    this.loading = false
  }

  async logout() {
    this.loading = true
    await api.logout()
    this.loading = false
  }
}
</script>
