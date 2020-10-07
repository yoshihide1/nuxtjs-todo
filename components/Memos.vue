<template>
  <div id="memo">
    <div v-for="(m, index) in messages" :key="index" class="memos">
      <p v-show="!showMessage">
        {{ lengthCheck(m.memo) }}
      </p>
      <p v-show="showMessage">{{ m.memo }}</p>
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

    test() {
      this.showMessage = !this.showMessage
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
