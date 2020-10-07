export default {
  messages(state) {
    console.log('message')
    return 'hello'
  },
  fetchDate() {
    console.log('getter')
    const d = new Date()
    const date = `${d.getFullYear()}年${d.getMonth() + 1}月
    ${d.getDate()}日${d.getHours()}時${d.getMinutes()}分`
    console.log(d)
    console.log(date)
    return date
  },
}
