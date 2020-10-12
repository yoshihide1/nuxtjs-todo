<template>
  <div id="task__count">
    <b-badge variant="primary" class="task__count"
      ><span class="task__count__text">全体</span>{{ totalTask }}</b-badge
    >
    <b-badge variant="primary" class="task__count"
      ><span class="task__count__text">完了</span>{{ completeTask }}</b-badge
    >
    <b-badge variant="primary" class="task__count"
      ><span class="task__count__text">未完</span>{{ remainingTask }}</b-badge
    >
    <b-badge variant="primary" class="task__count">
      <span class="task__count__text">完了率</span>{{ completeRate
      }}<span>%</span>
    </b-badge>
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
  width: 100%;
  display: flex;
  justify-content: center;
}
.task__count {
  margin: 0 1rem;
  font-size: 1rem;
}
.task__count__text {
  font-size: 0.8rem;
  margin-right: 0.3rem;
}
</style>
