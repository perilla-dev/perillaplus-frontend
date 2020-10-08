<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card :loading="loading">
        <v-tabs v-model="tab">
          <v-tabs-slider></v-tabs-slider>

          <v-tab key="problems">
            Problems
          </v-tab>
          <v-tab-item key="problems">
            <problem-list :loading.sync="loading" />
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ProblemList from '@/components/ProblemList.vue'
import { M_PATH_POP, M_PATH_PUSH } from '@/store'

@Component({ components: { ProblemList } })
export default class Group extends Vue {
  @Prop()
  groupId!: string

  loading = false
  tab = 0

  mounted() {
    this.$store.commit(M_PATH_PUSH, { text: 'Group', to: '/group' })
    this.$on('hook:beforeDestroy', () => {
      this.$store.commit(M_PATH_POP)
    })
  }
}
</script>
