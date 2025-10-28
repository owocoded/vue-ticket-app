<template>
  <footer class="footer mt-5 py-4 bg-dark text-white">
    <div class="container-xl">
      <div class="d-flex justify-content-between align-items-center">
        <span>© {{ year }} Ticket App. All rights reserved.</span>
        <div>
          <a href="#" class="text-white me-3 text-decoration-none">Terms of Service</a>
          <a href="#" class="text-white text-decoration-none">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  margin-top: auto;
}
</style>