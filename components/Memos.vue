<template>
  <div id="memo">
    <div v-for="task in taskList" :key="task.id" class="tasks">
      <div class="task__list">
        <p class="check__box">
          <input
            type="checkbox"
            :checked="task.checkBox"
            @change="taskComplete(task.id)"
          />
        </p>
        <p :class="{ done: task.isDone }">{{ lengthCheck(task.memo) }}</p>
      </div>
      <div>
        <font-awesome-icon
          class="edit__btn"
          :icon="['fas', 'tools']"
          @click="editTask(task.id)"
        />
        <small>{{ task.date }}</small>
        <font-awesome-icon
          class="delete__btn"
          :icon="['fas', 'trash-alt']"
          @click="deleteTask(task.id)"
        />
      </div>
    </div>
    <button :disabled="deleteAllButton" @click="deleteAll">全件削除</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      complete: false,
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
.tasks {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid black;
  margin-bottom: 1rem;
  padding: 0 5px;
}
.task__list {
  display: flex;
}
.check__box {
  margin-right: 0.2rem;
}
p.done {
  text-decoration: line-through;
}
.edit__btn {
  cursor: pointer;
}
.delete__btn {
  cursor: pointer;
}
</style>
