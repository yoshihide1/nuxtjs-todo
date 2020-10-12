<template>
  <div id="memo">
    <div>
      <small>絞り込み</small>
      <button @click="taskFiltering('all')">全て</button>
      <button @click="taskFiltering(true)">完了</button>
      <button @click="taskFiltering(false)">未完</button>
    </div>
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
        <small>残り{{ getLimit(task.limit) }}日</small>
        <small>{{ task.date }}</small>
        <font-awesome-icon
          class="delete__btn"
          :icon="['fas', 'trash-alt']"
          @click="deleteTask(task.id)"
        />
      </div>
    </div>
    <button @click="deleteCompleted">完了済み削除</button>
    <button :disabled="deleteAllButton" @click="deleteAll">全件削除</button>
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
    ...mapState(['taskList']),
    ...mapGetters(['deleteAllButton']),
  },
  watch: {
    taskList: {
      handler() {
        console.log('watch')
        this.tasks = this.taskList
        this.localData()
      },
      deep: true,
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

    getLimit(limit) {
      const year = Number(limit.slice(0, 4))
      const month = Number(limit.slice(5, 7)) - 1
      const date = Number(limit.slice(8, 10))
      const limitDate = new Date(year, month, date)
      const d = new Date()
      const nowDate = new Date(d.getFullYear(), d.getMonth(), d.getDate())
      const day = 1000 * 60 * 60 * 24
      return (limitDate - nowDate) / day
    },

    lengthCheck(memo) {
      if (memo.length >= 15) {
        return this.sliceTaskMemo(memo)
      } else {
        return memo
      }
    },

    sliceTaskMemo(memo) {
      const m = memo.slice(0, 15)
      return `${m}...`
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
    taskFiltering(boolean) {
      if (boolean === 'all') {
        this.tasks = this.taskList
      } else {
        this.tasks = this.$store.getters.filtering(boolean)
      }
    },
  },
}
</script>

<style>
.tasks {
  border-bottom: 2px solid black;
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
