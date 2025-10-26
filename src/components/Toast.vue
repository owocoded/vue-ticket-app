<template>
  <div v-if="isVisible" class="toast" :class="{ show: isVisible }">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults } from 'vue';

interface Props {
  message?: string;
}

const props = withDefaults(defineProps<Props>(), {
  message: ''
});

const isVisible = ref(false);

// Function to show the toast
const showToast = (msg: string, duration: number = 3000) => {
  isVisible.value = true;
  setTimeout(() => {
    isVisible.value = false;
  }, duration);
};

defineExpose({
  showToast
});
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #333;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  z-index: 9999;
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 0.3s, transform 0.3s;
}

.toast.show {
  opacity: 1;
  transform: translateX(0);
}
</style>