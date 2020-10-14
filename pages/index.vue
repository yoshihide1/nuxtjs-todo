<template>
  <div class="container">
    <div class="title">Todo-List</div>

    <div class="items">
      <SearchAndSort />
      <Posts />
      <TaskCounts />
      <div class="item__task">
        <Memos />
        <DeleteButton />
      </div>
      <EditModalWindow />
    </div>
  </div>
</template>

<script>
import Posts from '@/components/Posts'
import TaskCounts from '@/components/TaskCounts'
import SearchAndSort from '@/components/SearchAndSort'
import Memos from '@/components/Memos'
import EditModalWindow from '@/components/EditModalWindow'
import DeleteButton from '@/components/DeleteButton'
export default {
  components: {
    Posts,
    TaskCounts,
    SearchAndSort,
    Memos,
    EditModalWindow,
    DeleteButton,
  },
}
</script>

<style>
html {
  background-color: #eaf6fd;
}
#__layout {
  width: 100%;
  background-color: #eaf6fd;
}
.container {
  padding: 0;
  margin: 0;
  text-align: center;
}
.title {
  width: 100vw;
  height: 65px;
  background-color: #002a5b;
  color: #eaf6fd;
  font-size: 2.3rem;
  font-style: italic;
  border-bottom: 5px solid #c41a30;
}
.items {
  width: 100vw;
}

@media screen and (max-width: 480px) {
  .item__task {
    margin-bottom: 120px;
  }
}
</style>
