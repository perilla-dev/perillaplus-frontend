<template>
  <user-indicator-logged-in v-if="userId" />
  <v-btn text outlined large v-else to="/login">
    <v-icon left>mdi-account</v-icon>
    Login
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import UserIndicatorLoggedIn from '@/components/UserIndicatorLoggedIn.vue'

@Component({
  components: { UserIndicatorLoggedIn },
  computed: {
    ...mapState(['userId'])
  }
})
export default class UserIndicator extends Vue {}
</script>
