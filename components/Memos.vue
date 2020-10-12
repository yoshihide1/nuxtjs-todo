<template>
  <div id="memo">
    <div class="task__controller">
      <div>
        <p>
          <small>絞り込み</small>
        </p>
        <b-button
          variant="outline-success"
          class=""
          @click="taskFiltering('all')"
          >全て</b-button
        >
        <b-button
          variant="outline-success"
          class=""
          @click="taskFiltering(true)"
          >完了</b-button
        >
        <b-button
          variant="outline-success"
          class=""
          @click="taskFiltering(false)"
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
        <b-button
          variant="outline-success"
          class=""
          @click="taskSort('created')"
          >作成.更新</b-button
        >
      </div>
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
        <small>{{ getLimit(task.limit, task) }}</small>
        <small>{{ task.date }}</small>
        <font-awesome-icon
          class="delete__btn"
          :icon="['fas', 'trash-alt']"
          @click="deleteTask(task.id)"
        />
      </div>
    </div>
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
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      complete: false,
      tasks: [],
      timeLimit: 0,
      sortFacing: 'desc',
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
    taskFiltering(boolean) {
      if (boolean === 'all') {
        this.tasks = this.taskList
      } else {
        this.tasks = this.$store.getters.filtering(boolean)
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

<style>
.btn-outline-success {
  padding: 3px 10px;
}
.tasks {
  border-bottom: 2px solid black;
  margin-bottom: 1rem;
  padding: 0 5px;
}
.task__controller {
  display: flex;
  justify-content: space-between;
}
.task__controller p {
  margin: 0;
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
