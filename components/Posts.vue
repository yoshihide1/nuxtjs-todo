<template>
  <div id="post">
    <div class="post__form">
      <b-button
        variant="outline-light"
        class="eraser__button"
        @click="clearTask"
        ><font-awesome-icon :icon="['fas', 'eraser']" />
        <span class="sp__none">消す</span></b-button
      >
      <div>
        <small>期限</small
        ><input v-model="timeLimit" type="date" class="memo__date" />
      </div>
      <b-button variant="outline-light" class="memo__button" @click="addTask"
        ><font-awesome-icon :icon="['fas', 'pen-nib']" />
        <span class="sp__none">追加</span></b-button
      >
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
  width: 80%;
  padding: 10px;
  background-color: #002a5b;
  border-radius: 5px;
  border: 2px solid #70372c;
  margin: 0 auto;
}
.post__form {
  display: flex;
  justify-content: space-between;
  margin: 0 1rem;
  padding-top: 1rem;
}
.post__form small {
  color: #d7000f;
}
.eraser__button {
  width: 20%;
}
.memo__form {
  margin-top: 10px;
  background-color: #eaf6fd;
  border: 2px solid #d7000f;
  color: #fff;
}
.memo__date {
  border: 1px solid #002a5b;
  border-radius: 5px;
  background-color: #eaf6fd;
  margin-left: 5px;
  color: #002a5b;
}
.memo__button {
  width: 20%;
}
.input__group {
  width: 100%;
  display: flex;
}

@media screen and (max-width: 480px) {
  #post {
    width: 95%;
  }
  .sp__none {
    display: none;
  }
}
</style>
