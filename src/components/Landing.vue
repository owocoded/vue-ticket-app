<template>
  <div class="d-flex flex-column min-vh-100">
    <Header />
    <main class="flex-grow-1">
      <div class="container-landing">
        <section class="position-relative">
          <!-- Wave background -->
          <div class="position-absolute top-0 start-0 w-100 overflow-hidden">
            <svg class="wave-svg" viewBox="0 0 1200 300" preserveAspectRatio="none">
              <path d="M0,280 L0,300 L1200,300 L1200,280 C1000,200 800,350 600,280 C400,210 200,300 0,280 Z" fill="#f8fafc"/>
            </svg>
          </div>
          
          <!-- Decorative circles -->
          <div class="position-absolute circle circle-1 rounded-circle bg-success opacity-25" style="width: 160px; height: 160px; right: 6%; top: 4%;"></div>
          <div class="position-absolute circle circle-2 rounded-circle bg-warning opacity-25" style="width: 90px; height: 90px; left: 8%; top: 50%;"></div>
          
          <!-- Hero content -->
          <div class="position-relative py-5 my-5">
            <div class="row justify-content-center text-center">
              <div class="col-lg-8 pt-5">
                <h1 class="display-4 fw-bold mb-3">TicketApp — Manage tickets simply</h1>
                <p class="lead text-muted mb-4">Track, update and resolve support tickets with a lightweight interface.</p>
                <div class="d-flex justify-content-center gap-3 flex-wrap">
                  <RouterLink to="/auth/login" class="btn btn-primary btn-lg px-4 py-2 rounded-3">Login</RouterLink>
                  <RouterLink to="/auth/signup" class="btn btn-outline-primary btn-lg px-4 py-2 rounded-3">Get Started</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Feature Cards -->
        <section class="py-5">
          <div class="container-landing">
            <div class="row g-4">
              <div class="col-md-4">
                <div class="card h-100 shadow-sm rounded-3 p-4 border-0">
                  <div class="card-body text-center">
                    <h3 class="card-title h5">Fast</h3>
                    <p class="card-text text-muted">Quickly create and manage tickets.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card h-100 shadow-sm rounded-3 p-4 border-0">
                  <div class="card-body text-center">
                    <h3 class="card-title h5">Accessible</h3>
                    <p class="card-text text-muted">Semantic HTML and keyboard navigable UI.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card h-100 shadow-sm rounded-3 p-4 border-0">
                  <div class="card-body text-center">
                    <h3 class="card-title h5">Client-first</h3>
                    <p class="card-text text-muted">Simulated auth using localStorage.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
</script>