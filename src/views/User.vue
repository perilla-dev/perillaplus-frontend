<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card :loading="loading">
        <v-card-title>
          <div>
            <div>{{ user.disp }}</div>
            <div class="subtitle-1">
              <code>{{ user.name }}</code>
            </div>
          </div>
          <v-spacer />
          <v-avatar>
            <gravatar :email="user.email" />
          </v-avatar>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <markup :code="JSON.stringify(user, null, '  ')" language="json" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { M_PATH_POP, M_PATH_PUSH, M_PATH_REPLACE } from '@/store'
import { api } from '@/api'
import Gravatar from '@/components/Gravatar.vue'
import Markup from '@/components/vuetify/Markup.vue'

@Component({
  components: { Gravatar, Markup },
  beforeRouteEnter(to, from, next) {
    api.state.userId ? next() : next('/login')
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class User extends Vue {
  @Prop()
  userId!: string

  loading = false

  user = {} as any

  created() {
    this.$store.commit(M_PATH_PUSH, { text: `User: ${this.userId}`, to: this.currentURL })
    this.loadData()
  }

  async loadData() {
    this.loading = true
    this.user = await api.user.get(this.userId)
    this.$store.commit(M_PATH_REPLACE, { text: `User: ${this.user.disp}`, to: this.currentURL })
    this.loading = false
  }

  get currentURL() {
    return `/user/${this.userId}`
  }
}
</script>
