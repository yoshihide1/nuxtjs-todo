import { myFunc } from '../plugins/myFunc'
export default {
  addTask({ commit }, message) {
    const taskData = {
      id: myFunc.createId(),
      memo: message,
      date: `${myFunc.fetchDate()}作成`,
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
      date: `${myFunc.fetchDate()}更新`,
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
