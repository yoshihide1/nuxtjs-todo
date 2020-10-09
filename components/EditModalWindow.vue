<template>
  <div v-show="showModal" id="modal">
    <div id="modal__window">
      <div class="modal__inner">
        <font-awesome-icon
          class="close__btn"
          :icon="['fas', 'times-circle']"
          @click="modalClose"
        />
        <input class="edit__text" type="text" />
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
      showModal: false,
    }
  },
  computed: {
    ...mapState(['message']),
  },
  watch: {
    message() {
      this.showModal = true
    },
  },
  methods: {
    modalClose() {
      this.showModal = false
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
  transition: 0.5s;
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
