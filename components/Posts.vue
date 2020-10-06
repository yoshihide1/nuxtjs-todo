<template>
  <div id="memo">
    <input
      class="memo__form"
      v-model="message"
      type="text"
      placeholder="memo"
    />
    <p><button @click="postMemo">メモする</button></p>
    <div v-for="(m, index) in messages" :key="index">
      <p>{{ m }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      messages: [],
    }
  },
  methods: {
    postMemo() {
      if (!this.message) {
        return alert('入力してください')
      }
      this.messages.push(this.message)
      this.message = ''
    },
  },
}
</script>

<style>
.memo__form {
  border: 1px solid black;
}
</style>
