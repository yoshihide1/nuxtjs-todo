<template>
  <div class="container">
    <div class="title">Todo-List</div>
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
  padding: 0;
  margin: 0 auto;
  text-align: center;
}
.title {
  font-size: 2rem;
  border-bottom: 2px solid black;
  margin-bottom: 1rem;
}
</style>
