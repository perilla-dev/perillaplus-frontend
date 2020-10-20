<template>
  <v-autocomplete :loading="loading" :items="items" v-model="_value" flat hide-no-data hide-details item-text="name" item-value="id" label="Select type">
    <!-- <template slot="item" slot-scope="data">
      <v-list-tile>
        <v-list-tile-avatar>
          <v-icon v-if="data.item.admin">person</v-icon>
          <v-icon v-else>person_outline</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title v-html="data.item.to"></v-list-tile-title>
      </v-list-tile>
    </template> -->
  </v-autocomplete>
</template>

<script lang="ts">
import { api } from '@/api'
import { Vue, Component, Model } from 'vue-property-decorator'

@Component
export default class TypeSelector extends Vue {
  @Model('change')
  value!: string

  get _value() {
    return this.value
  }

  set _value(val) {
    this.$emit('change', val)
  }

  loading = false
  items = [] as any[]

  created() {
    this.load()
  }

  async load() {
    this.loading = true
    this.items = await api.problem.listTypes()
    this.loading = false
  }
}
</script>
