<template>
  <div id="memo">
    <input
      v-model="message"
      class="memo__form"
      type="text"
      placeholder="memo"
    />
    <p><button @click="postMemo">メモする</button></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    }
  },
  methods: {
    postMemo() {
      if (!this.message) {
        return alert('入力してください')
      }
      this.$store.dispatch('postMessage', this.message)
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
