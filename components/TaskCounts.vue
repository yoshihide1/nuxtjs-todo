<template>
  <div id="task__count">
    <p class="task__count"><span>全体</span>{{ totalTask }}</p>
    <p class="task__count"><span>完了</span>{{ completeTask }}</p>
    <p class="task__count"><span>未完</span>{{ remainingTask }}</p>
    <p class="task__count">
      <span>完了率</span>{{ completeRate }}<span>%</span>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      totalTask: 0,
      completeTask: 0,
      remainingTask: 0,
      completeRate: 0,
    }
  },
  computed: {
    ...mapState(['taskList']),
  },
  watch: {
    taskList: {
      handler() {
        this.totalCount()
        this.completeCount()
      },
      deep: true,
    },
  },
  methods: {
    totalCount() {
      this.totalTask = this.taskList.length
    },

    completeCount() {
      let count = 0
      this.taskList.forEach((task) => {
        if (task.isDone === true) {
          count++
        }
      })
      this.completeTask = count
      this.remainingCount()
    },

    remainingCount() {
      this.remainingTask = this.totalTask - this.completeTask
      this.rate()
    },

    rate() {
      if (this.totalTask === 0) {
        return 0
      }
      this.completeRate = Math.floor((this.completeTask / this.totalTask) * 100)
    },
  },
}
</script>

<style>
#task__count {
  display: flex;
  justify-content: center;
  background-color: cyan;
}
.task__count {
  margin: 0 1rem;
}
.task__count span {
  font-size: 0.7rem;
  margin-right: 0.5rem;
}
</style>
