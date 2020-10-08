<template>
  <v-card flat>
    <v-card-title>Problems</v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator'

@Component
export default class ProblemList extends Vue {
  @PropSync('loading')
  _loading!: boolean
}
</script>
