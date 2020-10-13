<template>
  <v-app>
    <v-app-bar app>
      <div class="pt-3">
        <img src="@/assets/logo-text.svg" height="32" class="logo" />
      </div>
      <v-btn text x-large class="text-center text-none">
        {{ title }}
      </v-btn>
      <v-spacer />
      <user-indicator />
    </v-app-bar>
    <v-main>
      <v-container>
        <v-breadcrumbs :items="path" class="pa-0"></v-breadcrumbs>
        <router-view />
      </v-container>
    </v-main>
    <v-footer dark app absolute>
      <v-row justify="end" no-gutters>
        <v-col cols="12" class="text-right">
          <div>
            <div class="text-button">&copy; {{ new Date().getFullYear() }} PerillaDev</div>
            <div>
              <img src="@/assets/logo-text.svg" height="32" class="logo" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import UserIndicator from '@/components/UserIndicator.vue'
import { mapState } from 'vuex'

@Component({
  components: { UserIndicator },
  computed: {
    ...mapState(['title', 'path'])
  }
})
export default class App extends Vue {
  created() {
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    this.$vuetify.theme.dark = darkMediaQuery.matches
    darkMediaQuery.addEventListener('change', e => {
      this.$vuetify.theme.dark = e.matches
    })
  }
}
</script>

<style lang="scss">
.theme--dark .logo {
  filter: invert(1);
}
</style>
