<template>
  <footer class="footer mt-auto py-4 bg-dark text-white">
    <div class="container-landing">
      <div class="d-flex justify-content-between align-items-center">
        <span>© {{ year }} Vue Ticket App. All rights reserved.</span>
        <div>
          <a href="#" class="text-white me-3">Contact</a>
          <a href="#" class="text-white">Privacy Policy</a>
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