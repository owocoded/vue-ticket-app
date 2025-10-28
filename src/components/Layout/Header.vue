<template>
  <header class="header bg-light text-white">
    <nav class="navbar navbar-expand-md navbar-light bg-white">
      <div class="container-fluid">
        <RouterLink class="navbar-brand text-dark" to="/">Ticket App</RouterLink>
        
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div class="navbar-nav ms-auto">
            <!-- <RouterLink class="nav-link text-dark" to="/">Home</RouterLink> -->
            <RouterLink v-if="!authStore.isAuthenticated" class="nav-link text-dark" to="/auth/login">Login</RouterLink>
            <RouterLink v-if="!authStore.isAuthenticated" class="nav-link text-dark" to="/auth/signup">Get started</RouterLink>
            <RouterLink v-if="authStore.isAuthenticated" class="nav-link text-dark" to="/dashboard">Dashboard</RouterLink>
            <RouterLink v-if="authStore.isAuthenticated" class="nav-link text-dark" to="/tickets">Tickets</RouterLink>
            <button v-if="authStore.isAuthenticated" class="btn btn-outline-dark ms-2" @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<style scoped>
.header {
  padding: 0.5rem 1rem;
}
.navbar-brand {
  font-weight: bold;
}
</style>