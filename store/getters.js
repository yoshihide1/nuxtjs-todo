export default {
  findTaskIndex: (state) => (taskId) => {
    return state.taskList.findIndex((task) => task.id === taskId)
  },

  findTask: (state) => (taskId) => {
    return state.taskList.find((task) => task.id === taskId)
  },

  deleteTask: (state) => (taskId) => {
    return state.taskList.filter((task) => task.id !== taskId)
  },

  deleteAllButton: (state) => {
    const num = state.taskList.length
    if (num > 0) {
      return false
    } else {
      return true
    }
  },
}
