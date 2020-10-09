<template>
  <div class="container">
    <div class="title">Todo-List</div>
    <Posts />
    <Memos />
    <EditModalWindow />
  </div>
</template>

<script>
import Posts from '@/components/Posts'
import Memos from '@/components/Memos'
import EditModalWindow from '@/components/EditModalWindow'
export default {
  components: {
    Posts,
    Memos,
    EditModalWindow,
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
