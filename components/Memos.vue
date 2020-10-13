<template>
  <div id="tasks">
    <div v-for="task in tasks" :key="task.id" class="tasks">
      <div class="task__list">
        <p class="check__box">
          <input
            type="checkbox"
            :checked="task.checkBox"
            @change="taskComplete(task.id)"
          />
        </p>
        <details>
          <summary>
            <span :class="{ done: task.isDone }">
              {{ lengthCheck(task.memo) }}
            </span>
          </summary>
          <p>{{ task.memo }}</p>
        </details>
      </div>
      <div class="task__limit">
        <font-awesome-icon
          class="edit__btn"
          :icon="['fas', 'tools']"
          @click="editTask(task.id)"
        />
        <small>期限{{ task.limit }}</small>
        <small>{{ getLimit(task.limit, task) }}</small>
        <small>{{ task.date }}</small>
        <font-awesome-icon
          class="delete__btn"
          :icon="['fas', 'trash-alt']"
          @click="deleteTask(task.id)"
        />
      </div>
    </div>
    <div>
      <b-button variant="outline-danger" @click="deleteCompleted"
        >完了<font-awesome-icon :icon="['fas', 'trash-alt']"
      /></b-button>
      <b-button
        variant="outline-danger"
        :disabled="deleteAllButton"
        @click="deleteAll"
        >全件<font-awesome-icon :icon="['fas', 'trash-alt']"
      /></b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      complete: false,
      tasks: [],
      timeLimit: 0,
    }
  },

  computed: {
    ...mapState(['taskList', 'filterList']),
    ...mapGetters(['deleteAllButton']),
  },
  watch: {
    taskList: {
      handler() {
        this.tasks = this.taskList
        this.localData()
      },
      deep: true,
    },
    filterList() {
      this.tasks = this.filterList
    },
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const jsonGet = localStorage.getItem('ToDoList')
      const taskData = JSON.parse(jsonGet)
      this.$store.commit('taskList', taskData)
    },

    getLimit(limit, task) {
      const year = Number(limit.slice(0, 4))
      const month = Number(limit.slice(5, 7)) - 1
      const date = Number(limit.slice(8, 10))
      const limitDate = new Date(year, month, date)
      const d = new Date()
      const nowDate = new Date(d.getFullYear(), d.getMonth(), d.getDate())
      const day = 1000 * 60 * 60 * 24
      const result = (limitDate - nowDate) / day
      const returnValue = this.limitCheck(result, task)
      return returnValue
    },

    limitCheck(result, task) {
      if (task.isDone) return '完了済み'
      else if (result === 0) return '今日が期限日です'
      else if (result < 0) return '期限が過ぎています'
      else return `残り${result}日`
    },

    lengthCheck(memo) {
      if (memo.length >= 15) return `${memo.slice(0, 15)}...`
      else return memo
    },

    editTask(taskId) {
      const index = this.$store.getters.findTaskIndex(taskId)
      this.$store.commit('modalOpen', index)
    },

    deleteTask(taskId) {
      this.$store.dispatch('deleteTask', taskId)
    },

    localData() {
      const taskList = this.taskList.filter((v) => v)
      const jsonData = JSON.stringify(taskList)
      localStorage.clear()
      localStorage.setItem('ToDoList', jsonData)
    },

    taskComplete(taskId) {
      const index = this.$store.getters.findTaskIndex(taskId)
      this.$store.commit('taskComplete', index)
    },

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

<style>
#tasks {
  padding-bottom: 110px;
}
.btn-outline-success {
  padding: 3px 10px;
}
.tasks {
  border-bottom: 3px solid #c41a30;
  margin-bottom: 1rem;
  padding: 0 5px;
}
.task__list {
  display: flex;
}
.task__limit {
  display: flex;
  justify-content: space-between;
}
.check__box {
  margin-right: 0.6rem;
}
span.done {
  text-decoration: line-through;
}
.edit__btn {
  cursor: pointer;
}
.delete__btn {
  cursor: pointer;
}
</style>
