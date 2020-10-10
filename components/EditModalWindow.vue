<template>
  <div v-show="showModal" id="modal">
    <div id="modal__window">
      <div class="modal__inner">
        <font-awesome-icon
          class="close__btn"
          :icon="['fas', 'times-circle']"
          @click="modalClose"
        />
        <p>{{ task }}</p>
        <p>
          <input v-model="editTask.memo" class="edit__text" type="text" />
        </p>
        <div>
          <button @click="saveTask">保存</button>
          <button @click="modalClose">キャンセル</button>
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
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  background-color: burlywood;
  z-index: 3;
}
.close__btn {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 3rem;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.modal__back_color {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
  cursor: pointer;
}
</style>
