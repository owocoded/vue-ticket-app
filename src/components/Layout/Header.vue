<template>
  <header class="header bg-primary text-white">
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <div class="container-fluid">
        <RouterLink class="navbar-brand text-white" to="/">Vue Ticket App</RouterLink>
        
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
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="navbar-nav ms-auto">
            <RouterLink class="nav-link text-white" to="/">Home</RouterLink>
            <RouterLink v-if="!authStore.isAuthenticated" class="nav-link text-white" to="/auth/login">Login</RouterLink>
            <RouterLink v-if="!authStore.isAuthenticated" class="nav-link text-white" to="/auth/signup">Sign Up</RouterLink>
            <RouterLink v-if="authStore.isAuthenticated" class="nav-link text-white" to="/dashboard">Dashboard</RouterLink>
            <RouterLink v-if="authStore.isAuthenticated" class="nav-link text-white" to="/tickets">Tickets</RouterLink>
            <button v-if="authStore.isAuthenticated" class="btn btn-outline-light ms-2" @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
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