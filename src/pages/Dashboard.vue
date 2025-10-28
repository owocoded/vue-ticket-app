<template>
  <div class="d-flex flex-column min-vh-100">
    <Header />
    <main class="flex-grow-1">
      <div class="container-landing py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1>Dashboard</h1>
          <p className="text-muted">
            Welcome back! Here's your ticket overview.
          </p>
        </div>

        <!-- Summary Statistics -->
        <div class="row g-4 mb-4">
          <div class="col-md-4">
            <div
              class="card text-center bg-white text-warning rounded-3 shadow-sm border-0"
            >
              <div class="card-body">
                <h5 class="card-title">Total Tickets</h5>
                <p class="display-4">{{ totalTickets }}</p>
                <RouterLink to="/tickets" class="btn  btn-outline-warning btn-sm">
                  Manage Tickets
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="card text-center bg-white text-success rounded-3 shadow-sm border-0"
            >
              <div class="card-body">
                <h5 class="card-title">Open Tickets</h5>
                <p class="display-4">{{ openTickets }}</p>
                <RouterLink to="/tickets" class="btn  btn-outline-success btn-sm">
                  Manage Tickets
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="card text-center bg-white text-muted rounded-3 shadow-sm border-0"
            >
              <div class="card-body">
                <h5 class="card-title">Resolved Tickets</h5>
                <p class="display-4">{{ resolvedTickets }}</p>
                <RouterLink to="/tickets" class="btn  btn-outline-secondary btn-sm">
                  Manage Tickets
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useTicketStore } from "@/stores/tickets";
import Header from "@/components/Layout/Header.vue";
import Footer from "@/components/Layout/Footer.vue";

const router = useRouter();
const authStore = useAuthStore();
const ticketStore = useTicketStore();

// Load tickets when dashboard is accessed
ticketStore.loadTickets();

// Calculate statistics
const totalTickets = computed(() => ticketStore.tickets.length);
const openTickets = computed(
  () => ticketStore.getTicketsByStatus("open").length
);
const resolvedTickets = computed(() => {
  // Assuming 'closed' status means resolved
  const closed = ticketStore.getTicketsByStatus("closed").length;
  const inProgress = ticketStore.getTicketsByStatus("in_progress").length;
  return closed + inProgress;
});

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};
</script>
