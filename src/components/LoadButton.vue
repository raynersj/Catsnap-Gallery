<!-- Button Component -->
<template>
  <button 
    v-if="visible"
    class="btn" 
    :disabled="disabled"  
    @click="loadMore">
    {{ text }}
  </button>
</template>

<script setup>
  import { defineEmits, defineProps } from 'vue';

  defineProps({
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type:Boolean,
      default: true
    },
    visible:{
      type:Boolean,
      default: true
    }
  });

  const emit = defineEmits(['load-more']);
  
  function loadMore() {
    emit('load-more');
  }
</script>

<style scoped>
  button {
    width: 340px;
    height: 50px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    margin: 20px 0; 
    border: none;
    border-radius: 3px;
    background: #3D52A0;  
    color: whitesmoke;
    user-select: none; /* Disable text selection */
  }

  button:hover{
    background: #3a4c95;  
  }

  /* Change the properties so we can use the button to display a message */
  button:disabled {
    background: transparent;
    color: darkgray;
  }
</style>
