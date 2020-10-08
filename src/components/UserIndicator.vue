<template>
  <v-btn text outlined large>
    <v-icon left>mdi-account</v-icon>
    Login
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({ components: {} })
export default class UserIndicator extends Vue {}
</script>
