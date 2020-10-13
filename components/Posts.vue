<template>
  <div id="post">
    <div class="date__form">
      <div>
        <small>期限</small
        ><input v-model="timeLimit" type="date" class="memo__date" />
      </div>
      <b-button
        variant="outline-success"
        class="eraser__button"
        @click="clearTask"
        ><font-awesome-icon :icon="['fas', 'eraser']" />
      </b-button>
      <b-button variant="outline-success" class="memo__button" @click="addTask"
        ><font-awesome-icon :icon="['fas', 'pen-nib']" />
      </b-button>
    </div>
    <div class="input__group">
      <b-input
        v-model="taskMemo"
        class="memo__form"
        type="text"
        placeholder="タスクの追加"
        @keydown.enter="addTask"
      />
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

    clearTask() {
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
  background-color: #494544;
}
.date__form {
  display: flex;
  justify-content: space-between;
  margin: 0 1rem;
  padding-top: 1rem;
}
.eraser__button {
  width: 20%;
}
.memo__form {
  margin-top: 10px;
  background-color: #494544;
  border: 0 solid;
  border-bottom: 5px solid #bac8c6;
  color: #fff;
}
.memo__date {
  border: 1px solid #bac8c6;
  border-radius: 5px;
  background-color: #494544;
  margin-left: 5px;
  color: #fff;
}
.memo__button {
  width: 20%;
}
.input__group {
  width: 100%;
  display: flex;
}
</style>
