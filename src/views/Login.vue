<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6" xl="4">
        <v-card>
          <v-card-title>
            Login
            <v-spacer />
            <v-btn outlined to="/register">
              Register
              <v-icon right>mdi-account-plus</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-text-field label="Username" v-model="username" />
            <v-text-field label="Password" type="password" v-model="password" />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="submit" :loading="loading">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { api } from '@/api'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'
import { toastSuccess } from '@/plugins/izitoast'

@Component({
  beforeRouteEnter(to, from, next) {
    api.state.userId ? next('/') : next()
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(M_PATH_POP)
    next()
  }
})
export default class Login extends Vue {
  loading = false
  username = ''
  password = ''
  async submit() {
    this.loading = true
    try {
      await api.login(this.username, this.password)
      toastSuccess('login succeeded')
      this.$router.push('/')
    } catch (e) {
      console.log(e)
    }
    this.loading = false
  }

  created() {
    this.$store.commit(M_PATH_PUSH, { text: 'Login', to: '/login' })
  }
}
</script>
