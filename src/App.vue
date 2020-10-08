<template>
  <v-app>
    <v-app-bar app>
      <v-avatar tile size="48" class="mr-4">
        <v-img src="@/assets/logo.svg" />
      </v-avatar>
      <v-btn text x-large class="pa-0 text-center">
        <div class="ma-2">
          <div class="font-weight-bold text-none"><span class="font-weight-light">Perilla</span> <span class="font-weight-bold">Plus</span></div>
          <div class="text-overline" style="line-height: unset;">
            preview
          </div>
        </div>
      </v-btn>
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
    <v-footer dark app>
      <v-row justify="end" no-gutters>
        <v-col cols="12" class="text-right">
          <v-btn text disabled class="text-none"> &copy; {{ new Date().getFullYear() }} PerillaDev</v-btn>
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
export default class App extends Vue {}
</script>
