import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface User {
  email: string;
}

export interface SessionData {
  token: string;
  user: string;
  createdAt?: number;
  stayLoggedIn?: boolean;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<string | null>(null);
  const loading = ref(false);

  const login = (
    email: string,
    password: string,
    stayLoggedIn: boolean
  ): boolean => {
    // Similar logic to React version
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    const userFound = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (userFound) {
      const session: SessionData = {
        token: "demo_token_123",
        user: email,
        stayLoggedIn,
        createdAt: stayLoggedIn ? undefined : Date.now(),
      };
      localStorage.setItem("ticketapp_session", JSON.stringify(session));
      user.value = email;
      return true;
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const signup = (email: string, password: string): boolean => {
    // Similar logic to React version
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    const existing = users.find((u: any) => u.email === email);
    if (existing) {
      throw new Error("User already exists");
    }
    users.push({ email, password });
    localStorage.setItem("ticketapp_users", JSON.stringify(users));
    return true;
  };

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    user.value = null;
  };

  const checkAuth = () => {
    const sessionStr = localStorage.getItem("ticketapp_session");
    if (sessionStr) {
      const session: SessionData = JSON.parse(sessionStr);
      if (
        session.stayLoggedIn ||
        (session.createdAt && Date.now() - session.createdAt < 30 * 60 * 1000)
      ) {
        user.value = session.user;
      } else {
        localStorage.removeItem("ticketapp_session");
      }
    }
  };

  const isAuthenticated = computed(() => !!user.value);

  return { user, login, signup, logout, checkAuth, isAuthenticated };
});
