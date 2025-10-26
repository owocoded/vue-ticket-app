import { defineStore } from "pinia";
import { ref } from "vue";

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 3000) => {
    const id = Date.now();
    toasts.value.push({ id, message, type, duration });

    // Auto-remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
  };

  const clearToasts = () => {
    toasts.value = [];
  };

  return { toasts, addToast, removeToast, clearToasts };
});