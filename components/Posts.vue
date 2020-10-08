<template>
  <div id="post">
    <input
      v-model="message"
      class="memo__form"
      type="text"
      placeholder="memo"
    />
    <button class="memo__button" @click="postMemo">メモ</button>
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

.memo__button {
  width: 20%;
  background-color: green;
  color: white;
}
</style>
