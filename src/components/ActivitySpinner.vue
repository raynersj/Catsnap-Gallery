<template>
    <div class="spinner-container">
        <div class="spinner"></div>
    </div>
</template>

<script setup>
</script>

<style scoped>
    .spinner-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin: 20px 0;
    }

    .spinner {
        border: 4px solid #ddd;
        border-top-color: #333;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        animation: spin 0.75s linear infinite; /* Spinner animation */
        transition-delay: 1s;
    }

    /* Spinner animation */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
