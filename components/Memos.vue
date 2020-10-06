<template>
  <div id="memo">
    <div v-for="(m, index) in messages" :key="index">
      <p>{{ m }}</p>
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
