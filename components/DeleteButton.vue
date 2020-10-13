<template>
  <div>
    <b-button-group>
      <b-button
        variant="outline-danger"
        :disabled="deleteAllButton"
        @click="deleteCompleted"
        ><font-awesome-icon :icon="['fas', 'trash-alt']" />完了</b-button
      >
      <b-button
        variant="outline-danger"
        :disabled="deleteAllButton"
        @click="deleteAll"
        >全件<font-awesome-icon :icon="['fas', 'trash-alt']"
      /></b-button>
    </b-button-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['deleteAllButton']),
  },
  methods: {
    deleteCompleted() {
      const res = confirm('完了済みタスクを全て削除しますか？ ※復元できません')
      if (res) {
        this.$store.dispatch('deleteCompletedTask')
      }
    },

    deleteAll() {
      const res = confirm('本当に消しますか？ ※復元できません')
      if (res) {
        localStorage.clear()
        this.$store.commit('deleteAllTask')
      }
    },
  },
}
</script>
