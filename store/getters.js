export default {
  fetchId() {
    const id =
      new Date().getTime().toString(16) +
      Math.floor(1000 * Math.random()).toString(16)
    return id
  },

  fetchDate() {
    const d = new Date()
    const date = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
    return date
  },

  getMemo: (state) => (memoId) => {
    return state.messages.find((memo) => memo.id === memoId)
  },

  deleteMemo: (state) => (memoId) => {
    return state.messages.filter((memo) => memo.id !== memoId)
  },
}
