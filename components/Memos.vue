<template>
  <div id="memo">
    <div v-for="m in messages" :key="m.id" class="memos">
      <div class="memo__list">
        <p class="check__box">
          <input
            type="checkbox"
            :checked="m.checkBox"
            @change="doneMessage(m.id)"
          />
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
    <!-- 削除ボタン、サンプル -->
    <button :disabled="deleteAllButton" @click="deleteAll">全件削除</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      complete: false,
    }
  },

  computed: {
    ...mapState(['messages']),
    ...mapGetters(['deleteAllButton']),
  },
  watch: {
    messages: {
      handler() {
        console.log('watch')
        this.localData()
      },
      deep: true,
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
      this.$store.commit('doneLine', memo)
    },

    deleteAll() {
      const res = confirm('本当に消しますか？ ※復元できません')
      if (res) {
        localStorage.clear()
        this.$store.commit('deleteAll')
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
