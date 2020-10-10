<template>
  <div id="post">
    <input
      v-model="taskMemo"
      class="memo__form"
      type="text"
      placeholder="memo"
    />
    <button class="memo__button" @click="addTask">メモ</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskMemo: '',
    }
  },
  methods: {
    addTask() {
      if (!this.taskMemo) {
        return alert('入力してください')
      }
      this.$store.dispatch('addTask', this.taskMemo)
      this.taskMemo = ''
    },
  },
}
</script>

<style>
#post {
  width: 100%;
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  border: 1px solid green;
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
