<template>
  <div class="container">
    <div class="title">Todo-List</div>
    <Posts />
    <TaskCounts />
    <Memos />
    <EditModalWindow />
  </div>
</template>

<script>
import Posts from '@/components/Posts'
import TaskCounts from '@/components/TaskCounts'
import Memos from '@/components/Memos'
import EditModalWindow from '@/components/EditModalWindow'
export default {
  components: {
    Posts,
    TaskCounts,
    Memos,
    EditModalWindow,
  },
}
</script>

<style>
#__layout {
  background-color: #494544;
  color: #fff;
}
.container {
  width: 100%;
  padding: 0;
  margin: 0 auto;
  text-align: center;
}
.title {
  font-size: 2.3rem;
  font-style: italic;
  border-bottom: 2px solid #c41a30;
  margin-bottom: 1rem;
}
</style>
