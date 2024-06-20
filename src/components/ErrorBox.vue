<!-- Basic error notification with default error message -->
<!-- TO DO: Display specific errror message -->
<template>
    <div class="error-box">
        <span class="text">
            An error has occurred. Please ensure you're connected to the internet and try again.
        </span>
    </div>
</template>

<script setup>
</script>

<style scoped>
    .error-box {
        display: flex; /* Enable flexbox */
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
        background-color: #FFEBEE;
        border:2px solid red;
        color: black;
        font-size: small;
        height: 60px;
        padding: 10px;
        margin: 20px auto;
        border-radius: 3px;
        text-align: center; /* Center the text within the container */
        max-width: 340px;
    }

    .text {
        display: flex;
        align-items: center;
        user-select: none;
    }
</style>