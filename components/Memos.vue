<template>
  <div id="memo">
    <div v-for="m in messages" :key="m.id" class="memos">
      <p @click="test(m.id)">{{ lengthCheck(m.memo) }}</p>
      <button @click="deleteMemo(m.id)">削除</button>
      <!-- <p @click="test(m.id)">{{ clickMemo.memo }}</p> -->
      <!-- <p>{{ m.id }}</p> -->
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
      clickMemo: '',
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

    deleteMemo(memoId) {
      const memoList = this.$store.getters.deleteMemo(memoId)
      this.$store.commit('newMessageBox', memoList)
    },

    test(memoId) {
      this.clickMemo = this.$store.getters.getMemo(memoId)
      alert(this.clickMemo.memo)
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
