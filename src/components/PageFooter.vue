<!-- Footer Component -->
<template>
    <footer class="footer">
      &copy; 2024 The Catsnap Gallery
      <section class="attribution">
        Powered by <a href="https://cataas.com" target="_blank">Cataas</a>
      </section>
    </footer>
</template>

<script setup>
</script>
  
<style scoped>
  .footer {
    background-color: #333;
    color: white;
    text-align: center; 
    padding: 10px;
    font-size: .75em;
    height: 60px;
  }

  .footer-content {
    margin-top: 10px;
  }

  .attribution {
    margin-top: 5px; 
    font-size: .7em; 
  }

  .attribution a {
    color: #f0f0f0; /* Link color */
    text-decoration: none; /* Remove underline from link */
  }

  .attribution a:hover {
    text-decoration: underline; /* Underline link on hover */
  }
</style>
  