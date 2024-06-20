<!-- Header Component -->
<template>
  <header class="header">
    <h1 class="title"><span class="colour">The Catsnap Gallery</span></h1>
  </header>
</template>

<script setup>
</script>

<style scoped>
  .colour {
    color:whitesmoke;
  }

  .title{
    font-size: 34px;
    margin: auto;
  }

  .header {
    display: flex;
    align-items: center; 
    background-color:#333;
    color:whitesmoke;
    height: 80px;
    border-bottom: 1px solid lightgray;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
