<template>
  <img :src="url" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import gravatar from 'gravatar'

@Component
export default class Gravatar extends Vue {
  @Prop()
  email!: string

  get url() {
    return gravatar.url(this.email)
  }
}
</script>
