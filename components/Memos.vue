<template>
  <div id="memo">
    <div v-for="(m, index) in messages" :key="index" class="memos">
      <p @click="test(m.id)">{{ lengthCheck(m.memo) }}</p>
      <p>{{ m.id }}</p>
      <!-- <p @click="test(m.id)">{{ m.memo }}</p> -->
      <small>{{ m.date }}</small>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showMessage: false,
    }
  },
  computed: {
    ...mapState(['messages']),
  },
  methods: {
    lengthCheck(message) {
      if (message.length >= 15) {
        return this.sliceMessage(message)
      } else {
        return message
      }
    },

    sliceMessage(message) {
      const m = message.slice(0, 15)
      return `${m}...`
    },

    test(memoId) {
      console.log(memoId)
      if (memoId === this.messages.id) {
        console.log(2222222)
        this.showMessage = !this.showMessage
      }
    },
  },
}
</script>
<style scoped>
.memos {
  display: flex;
  justify-content: space-between;
}
</style>
