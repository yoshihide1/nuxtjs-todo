<template>
  <div class="container">
    <Posts />
    <Memos />
  </div>
</template>

<script>
import Posts from '@/components/Posts'
import Memos from '@/components/Memos'
export default {
  components: {
    Posts,
    Memos,
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  text-align: center;
}
</style>
