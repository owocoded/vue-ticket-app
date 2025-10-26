<template>
  <div class="d-flex flex-column min-vh-100">
    <RouterView />
    <ToastComponent v-if="showToast" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import ToastComponent from "@/components/Toast.vue";

const authStore = useAuthStore();
const showToast = ref(false);

onMounted(() => {
  authStore.checkAuth();
});
</script>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "@/assets/style.css";
</style>
