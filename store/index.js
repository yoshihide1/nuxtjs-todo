import getters from './getters'
import actions from './actions'
export const state = () => ({
  taskList: [],
  task: {},
  showModal: false,
})

export const mutations = {
  newTask(state, taskData) {
    state.taskList.push(taskData)
  },

  updateTask(state, taskData) {
    state.taskList.splice(taskData.index, 1, taskData.task)
  },

  taskList(state, taskData) {
    state.taskList = []
    state.taskList = taskData
  },

  taskEdit(state, memo) {
    const index = state.taskList.findIndex((task) => task.id === memo.id)
    state.taskList[index].memo = memo.memo
  },

  taskComplete(state, index) {
    if (state.taskList[index].isDone) {
      state.taskList[index].checkBox = false
      state.taskList[index].isDone = false
    } else {
      state.taskList[index].checkBox = true
      state.taskList[index].isDone = true
    }
  },
  modalOpen(state, index) {
    state.task = state.taskList[index]
    state.showModal = true
  },
  modalClose(state) {
    state.showModal = false
  },

  deleteAllTask(state) {
    state.taskList = []
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
