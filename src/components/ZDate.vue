<template>
  <span>{{ datestr }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class GroupHome extends Vue {
  @Prop()
  date!: number

  get datestr() {
    const date = new Date(this.date)
    return date.toLocaleString()
  }
}
</script>
