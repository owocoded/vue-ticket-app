<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="col-md-6 col-lg-5">
      <div class="card shadow rounded-3 p-4">
        <div class="card-body">
          <h2 class="text-center mb-4">Welcome Back</h2>
          
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="form-label" for="email">Email</label>
              <input
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                id="email"
                v-model="email"
                @input="clearError('email')"
              />
              <div v-if="errors.email" class="text-danger small mt-1">{{ errors.email }}</div>
            </div>
            
            <div class="mb-3">
              <label class="form-label" for="password">Password</label>
              <input
                type="password"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                id="password"
                v-model="password"
                @input="clearError('password')"
              />
              <div v-if="errors.password" class="text-danger small mt-1">{{ errors.password }}</div>
            </div>
            
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="stayLoggedIn" v-model="stayLoggedIn">
              <label class="form-check-label" for="stayLoggedIn">Stay logged in</label>
            </div>
            
            <button type="submit" class="btn btn-primary w-100 py-2 mb-3">Login</button>
            <p class="text-center text-muted">
              Don't have an account? <RouterLink to="/auth/signup">Sign up</RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
    <ToastComponent ref="toastRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ToastComponent from '@/components/Toast.vue'

interface Errors {
  email?: string;
  password?: string;
  login?: string;
}

const router = useRouter()
const authStore = useAuthStore()

// Refs for toast
const toastRef = ref<InstanceType<typeof ToastComponent> | null>(null)

const email = ref('')
const password = ref('')
const stayLoggedIn = ref(false)
const errors = reactive<Errors>({})

const validateForm = () => {
  let isValid = true
  errors.email = ''
  errors.password = ''
  
  if (!email.value) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.email = 'Email is invalid'
    isValid = false
  }
  
  if (!password.value) {
    errors.password = 'Password is required'
    isValid = false
  } else if (password.value.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      const success = authStore.login(email.value, password.value, stayLoggedIn.value)
      if (success) {
        router.push('/dashboard')
        if (toastRef.value) {
          toastRef.value.showToast('Login successful!', 3000);
        }
      }
    } catch (error: any) {
      errors.login = error.message || 'Invalid credentials. Please try again.'
      if (toastRef.value) {
        toastRef.value.showToast('Invalid credentials. Please try again.', 3000);
      }
    }
  }
}

const clearError = (field: keyof Errors) => {
  if (errors[field]) {
    errors[field] = ''
  }
}
</script>
