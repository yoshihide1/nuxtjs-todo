import { myFunc } from '../plugins/myFunc'
export default {
  addTask({ commit }, task) {
    const taskData = {
      id: myFunc.createId(),
      memo: task.memo,
      date: `作成${myFunc.fetchDate()}`,
      limit: task.limit,
      isDone: false,
      checkBox: false,
    }
    commit('newTask', taskData)
  },

  updateTask({ commit, getters }, task) {
    const i = getters.findTaskIndex(task.id)
    const taskData = {
      id: myFunc.createId(),
      memo: task.memo,
      date: `更新${myFunc.fetchDate()}`,
      limit: task.limit.replace(/[-]/g, '/'),
      isDone: false,
      checkBox: false,
    }
    commit('updateTask', { task: taskData, index: i })
  },

  deleteTask({ commit, getters }, taskId) {
    const taskList = getters.deleteTask(taskId)
    commit('taskList', taskList)
  },

  deleteCompletedTask({ commit, getters }) {
    const taskList = getters.filtering(false)
    commit('taskList', taskList)
  },
}
