<template>
  <div class="cat-grid-container" >
    <!-- Grid layout for displaying cat images -->
    <div class="cat-grid">
      <!-- Iterate over each cat object and display it as a grid item -->
      <div v-for="cat in cats" :key="cat._id" class="cat-item">
        <!-- Link to open the cat image in a new tab -->
        <a :href="`https://cataas.com/cat/${cat.id}`" target="_blank">
          <!-- Display the cat image -->
          <img :src="cat.url" :alt="`Missing Cat`" class="cat-image"/>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
  // The array of preloaded images
  import { defineProps } from 'vue';
  defineProps({
    cats: Array,
  });
</script>

<style scoped>
  .cat-grid-container {
    display: flex;
    justify-content: center; /* Center the content horizontally */
    margin-top: 20px;
  }

  .cat-grid {
    display: flex;
    flex-wrap: wrap; /* Allow items to wrap to a new line */
    justify-content: center; /* Center the items horizontally */
    gap: 16px;
  }

  .cat-item {
    width: 300px; /* Fixed width for each grid item */
    height: 300px; /* Fixed height for each grid item */
  }

  .cat-image {
    width: 100%; /* Image full width of its container */
    height: 100%; /* Image full height of its container */
    object-fit: contain; /* Preserve the aspect ratio of the image */
    background-color: #fafafa; /* background for the image. Change to transparent if you prefer no background! */
    border-radius: 3px; /* subtle rounding */
  }
</style>
