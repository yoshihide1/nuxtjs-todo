<template>
  <div v-show="showModal" id="modal">
    <div id="modal__window">
      <div class="modal__inner">
        <font-awesome-icon
          class="close__btn"
          :icon="['fas', 'times-circle']"
          @click="modalClose"
        />
        <p>
          <textarea v-model="editTask.memo" class="edit__text" rows="11" />
        </p>
        <p>
          <span class="edit__limit">期限</span
          ><input v-model="editTask.limit" class="input__date" type="date" />
        </p>
        <div class="edit__btn">
          <b-button variant="outline-light" @click="saveTask">保存</b-button>
          <b-button variant="outline-light" @click="modalClose"
            >キャンセル</b-button
          >
        </div>
      </div>
      <div class="modal__back_color" @click="modalClose"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      editTask: '',
    }
  },
  computed: {
    ...mapState(['task', 'showModal']),
  },
  watch: {
    task() {
      this.editTask = { ...this.task }
      this.editTask.limit = this.dateFormat(this.editTask.limit)
    },
  },
  methods: {
    saveTask() {
      this.$store.dispatch('updateTask', this.editTask)
      this.modalClose()
    },
    modalClose() {
      this.$store.commit('modalClose')
    },
    dateFormat(date) {
      return date.replace(/[/]/g, '-')
    },
  },
}
</script>

<style scoped>
#modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: 0.6s;
}
.modal__inner {
  position: absolute;
  border-radius: 5px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 70%;
  background-color: #002a5b;
  z-index: 3;
}
.close__btn {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 3rem;
  width: 50px;
  height: 50px;
  margin: 10px 10px 0 0;
  line-height: 50px;
  text-align: center;
  color: #eaf6fd;
  cursor: pointer;
}
.modal__back_color {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
  cursor: pointer;
}
.edit__text {
  margin-top: 70px;
  width: 90%;
  border-radius: 5px;
  border: 2px solid #d7000f;
  background-color: #eaf6fd;
}

.input__date {
  background-color: #eaf6fd;
  border: 2px solid #d7000f;
}

.edit__limit {
  color: #eaf6fd;
  margin-right: 0.5rem;
}

@media screen and (max-width: 480px) {
  .modal__inner {
    width: 90%;
  }
  .edit__btn {
    margin-top: 4rem;
  }
}
</style>
