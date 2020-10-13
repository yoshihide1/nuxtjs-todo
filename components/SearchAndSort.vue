<template>
  <div class="task__controller">
    <div>
      <p>
        <small>絞り込み</small>
      </p>
      <b-button variant="outline-success" @click="taskFiltering('all')"
        >全て</b-button
      >
      <b-button variant="outline-success" @click="taskFiltering(true)"
        >完了</b-button
      >
      <b-button variant="outline-success" @click="taskFiltering(false)"
        >未完</b-button
      >
    </div>
    <div>
      <p>
        <small>ソート</small>
      </p>
      <b-button variant="outline-success" class="" @click="taskSort('limit')"
        >期限</b-button
      >
      <b-button variant="outline-success" @click="taskSort('date')"
        >作成.更新</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      sortFacing: 'desc',
    }
  },
  computed: {
    ...mapState(['taskList']),
  },
  methods: {
    taskFiltering(boolean) {
      if (boolean === 'all') {
        this.$store.commit('filtering', this.taskList)
      } else {
        const list = this.$store.getters.filtering(boolean)
        this.$store.commit('filtering', list)
      }
    },

    taskSort(target) {
      if (this.sortFacing === 'desc') {
        this.sortFacing = 'asc'
        this.$store.commit('taskSortAsc', target)
      } else {
        this.sortFacing = 'desc'
        this.$store.commit('taskSortDesc', target)
      }
    },
  },
}
</script>

<style scoped>
.task__controller {
  display: flex;
  justify-content: space-between;
  margin: 0.7rem 0;
}
.task__controller p {
  margin: 0;
}
</style>
