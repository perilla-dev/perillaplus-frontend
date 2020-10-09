<template>
  <v-btn text outlined large :loading="loading" class="text-none">
    <v-avatar size="32" left>
      <gravatar :email="user.email" />
    </v-avatar>
    {{ user.disp }}
  </v-btn>
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
}
</script>
