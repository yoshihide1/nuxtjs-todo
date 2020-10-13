<template>
  <div class="task__controller">
    <div>
      <b-button-group class="search__btn">
        <b-button variant="outline-dark" @click="taskFiltering('all')"
          ><font-awesome-icon :icon="['fas', 'search']" />全て</b-button
        >
        <b-button variant="outline-dark" @click="taskFiltering(true)"
          >完了</b-button
        >
        <b-button variant="outline-dark" @click="taskFiltering(false)"
          >未完</b-button
        >
      </b-button-group>
    </div>
    <div>
      <b-button-group class="sort__btn">
        <b-button variant="outline-dark" class="" @click="taskSort('limit')"
          ><font-awesome-icon :icon="['fas', 'arrows-alt-v']" /> 期限
        </b-button>
        <b-button variant="outline-dark" @click="taskSort('date')"
          >作成
        </b-button>
      </b-button-group>
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
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 0.7rem auto;
}
.task__controller p {
  margin: 0;
}
</style>
