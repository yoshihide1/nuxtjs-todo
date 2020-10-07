<template>
  <div id="memo">
    <div v-for="(m, index) in messages" :key="index" class="memos">
      <p>{{ lengthCheck(m.message) }}</p>
      <small>作成日{{ m.date }}</small>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['messages']),
  },
  methods: {
    lengthCheck(message) {
      if (message.length >= 20) {
        return this.sliceMessage(message)
      } else {
        return message
      }
    },
    sliceMessage(message) {
      const m = message.slice(0, 20)
      return `${m}...`
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
