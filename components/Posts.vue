<template>
  <div id="post">
    <div class="date__form">
      <small>期限</small
      ><input v-model="timeLimit" type="date" class="memo__date" />
    </div>
    <div class="input__group">
      <b-input
        v-model="taskMemo"
        class="memo__form"
        type="text"
        placeholder="タスクの追加"
      />
      <b-button variant="outline-success" class="memo__button" @click="addTask"
        ><font-awesome-icon :icon="['fas', 'pen-nib']" />
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskMemo: '',
      timeLimit: '',
    }
  },
  mounted() {
    this.timeLimit = this.fetchDate()
  },
  methods: {
    addTask() {
      if (!this.taskMemo) {
        return alert('入力してください')
      }
      this.$store.dispatch('addTask', {
        memo: this.taskMemo,
        limit: this.dateFormat(this.timeLimit),
      })
      this.taskMemo = ''
    },
    dateFormat() {
      return this.timeLimit.replace(/[-]/g, '/')
    },

    fetchDate() {
      const d = new Date()
      d.setDate(d.getDate() + 7)
      const date1 = d.getDate()
      let date2 = date1
      if (date1 < 10) {
        date2 = `0${String(date1)}`
      }
      const limitDate = `${d.getFullYear()}-${d.getMonth() + 1}-${date2}`
      return limitDate
    },
  },
}
</script>

<style>
#post {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding-top: 0.5rem;
  border-top: 1px solid #28a745;
  background-color: #6c757d;
}
.date__form {
  display: flex;
  justify-self: start;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
}
.memo__form {
  width: 80%;
}
.memo__date {
  align-items: end;
  border-radius: 5px;
  border: 1px solid #28a745;
  color: #28a745;
  margin-right: 10px;
}
.memo__button {
  width: 20%;
}
.input__group {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
