export default {
  messages(state) {
    return 'test'
  },

  fetchId() {
    const id =
      new Date().getTime().toString(16) +
      Math.floor(1000 * Math.random()).toString(16)
    return id
  },

  fetchDate() {
    const d = new Date()
    const date = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    return date
  },
}
