export default {
  getMemo: (state) => (memoId) => {
    return state.messages.find((memo) => memo.id === memoId)
  },

  deleteMemo: (state) => (memoId) => {
    return state.messages.filter((memo) => memo.id !== memoId)
  },

  deleteAllButton: (state) => {
    const num = state.messages.length
    if (num > 0) {
      return false
    } else {
      return true
    }
  },
}
