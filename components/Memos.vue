<template>
  <div id="memo">
    <div v-for="m in messages" :key="m.id" class="memos">
      <div class="memo__list">
        <p class="check__box">
          <input type="checkbox" @change="doneMessage(m.id)" />
        </p>
        <p :class="{ done: m.isDone }">{{ lengthCheck(m.memo) }}</p>
      </div>
      <div>
        <font-awesome-icon
          :icon="['fas', 'trash-alt']"
          @click="deleteMemo(m.id)"
        />
        <small>{{ m.date }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },

  computed: {
    ...mapState(['messages']),
  },
  watch: {
    messages() {
      console.log('watch:', 'messages')
      this.localData()
    },
  },
  mounted() {
    const jsonGet = localStorage.getItem('Memos')
    const memoData = JSON.parse(jsonGet)
    this.$store.commit('memoBox', memoData)
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
      this.$store.commit('memoBox', memoList)
    },

    localData() {
      const messages = this.messages.filter((v) => v)
      const jsonData = JSON.stringify(messages)
      localStorage.clear()
      localStorage.setItem('Memos', jsonData)
    },

    doneMessage(memoId) {
      const memo = this.$store.getters.getMemo(memoId)
      this.$store.commit('line', memo)
    },
  },
}
</script>

<style scoped>
.memos {
  display: flex;
  justify-content: space-between;
}
.memo__list {
  display: flex;
}
.check__box {
  margin-right: 0.2rem;
}
p.done {
  text-decoration: line-through;
}
</style>
