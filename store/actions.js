import { myFunc } from '../plugins/myFunc'
export default {
  addTask({ commit }, message) {
    const taskData = {
      id: myFunc.createId(),
      memo: message,
      date: myFunc.fetchDate(),
      isDone: false,
      checkBox: false,
    }
    commit('newTask', taskData)
  },

  updateTask({ commit, getters }, task) {
    console.log(222)
    const index = getters.findTaskIndex(task.id)
    const taskData = {
      id: myFunc.createId(),
      memo: task.memo,
      date: `${myFunc.fetchDate()}更新`,
      isDone: false,
      checkBox: false,
    }
    commit('updateTask', taskData, index)
  },

  deleteTask({ commit, getters }, taskId) {
    const taskList = getters.deleteTask(taskId)
    commit('taskList', taskList)
  },
}
