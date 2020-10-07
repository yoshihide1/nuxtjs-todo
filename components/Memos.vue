<template>
  <div id="memo">
    <div v-for="(m, index) in messages" :key="index" class="memos">
      <p>{{ m.message }}</p>
      <p>{{ m.date }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['messages']),
  },
}
</script>
<style scoped>
.memos {
  display: flex;
  justify-content: space-between;
}
</style>
