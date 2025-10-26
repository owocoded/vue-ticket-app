import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("@/components/Landing.vue"),
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("@/pages/Auth/Login.vue"),
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: () => import("@/pages/Auth/Signup.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/pages/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: () => import("@/pages/TicketsPage.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/auth/login");
  } else {
    if (to.path === "/auth/login" && authStore.isAuthenticated) {
      next("/dashboard");
    } else {
      next();
    }
  }
});

export default router;
    