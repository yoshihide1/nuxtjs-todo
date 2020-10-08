export default {
  getMemo: (state) => (memoId) => {
    return state.messages.find((memo) => memo.id === memoId)
  },

  deleteMemo: (state) => (memoId) => {
    return state.messages.filter((memo) => memo.id !== memoId)
  },
}
