<template>
  <div id="post">
    <input
      v-model="taskMemo"
      class="memo__form"
      type="text"
      placeholder="memo"
    />
    <div>
      <span>期限</span><input v-model="timeLimit" type="date" />
      <button class="memo__button" @click="addTask">追加</button>
      <p>{{ timeLimit }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskMemo: '',
      timeLimit: '',
    }
  },
  mounted() {
    this.timeLimit = this.fetchDate()
  },
  methods: {
    addTask() {
      if (!this.taskMemo) {
        return alert('入力してください')
      }
      this.$store.dispatch('addTask', {
        memo: this.taskMemo,
        limit: this.dateFormat(this.timeLimit),
      })
      this.taskMemo = ''
    },
    dateFormat() {
      return this.timeLimit.replace(/[-]/g, '/')
    },

    fetchDate() {
      const d = new Date()
      d.setDate(d.getDate() + 7)
      const date1 = d.getDate()
      let date2 = date1
      if (date1 < 10) {
        date2 = `0${String(date1)}`
      }
      const limitDate = `${d.getFullYear()}-${d.getMonth() + 1}-${date2}`
      return limitDate
    },
  },
}
</script>

<style>
#post {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border: 1px solid green;
  background-color: cadetblue;
  padding: 10px;
}
.memo__form {
  width: 80%;
}
.memo__date {
  width: 20%;
}
.memo__button {
  width: 20%;
  background-color: green;
  color: white;
}
</style>
