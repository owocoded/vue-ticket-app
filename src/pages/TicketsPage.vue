<template>
  <div class="d-flex flex-column min-vh-100">
    <Header />
    <main class="flex-grow-1">
      <div class="container-xl py-4" style="max-width: 1440px;">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1>Ticket Management</h1>
          <div>
            <button class="btn btn-primary me-2" @click="showCreateForm = true">Create Ticket</button>
            <button class="btn btn-outline-secondary" @click="handleLogout">Logout</button>
          </div>
        </div>

        <!-- Create Ticket Form -->
        <div v-if="showCreateForm" class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Create New Ticket</h5>
            <form @submit.prevent="createTicket">
              <div class="mb-3">
                <label for="title" class="form-label">Title *</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.title }"
                  id="title"
                  v-model="newTicket.title"
                  @input="clearError('title')"
                  required
                />
                <div v-if="errors.title" class="text-danger small mt-1">{{ errors.title }}</div>
              </div>
              
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea
                  class="form-control"
                  id="description"
                  v-model="newTicket.description"
                  rows="3"
                ></textarea>
              </div>
              
              <div class="mb-3">
                <label for="status" class="form-label">Status *</label>
                <select
                  class="form-select"
                  :class="{ 'is-invalid': errors.status }"
                  id="status"
                  v-model="newTicket.status"
                  @change="clearError('status')"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <div v-if="errors.status" class="text-danger small mt-1">{{ errors.status }}</div>
              </div>
              
              <div class="mb-3">
                <label for="priority" class="form-label">Priority</label>
                <select class="form-select" id="priority" v-model="newTicket.priority">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-success">Create Ticket</button>
                <button type="button" class="btn btn-secondary" @click="showCreateForm = false">Cancel</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Edit Ticket Form -->
        <div v-if="editingTicket" class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Edit Ticket</h5>
            <form @submit.prevent="updateTicket">
              <div class="mb-3">
                <label for="editTitle" class="form-label">Title *</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': editErrors.title }"
                  id="editTitle"
                  v-model="editingTicket.title"
                  @input="clearEditError('title')"
                  required
                />
                <div v-if="editErrors.title" class="text-danger small mt-1">{{ editErrors.title }}</div>
              </div>
              
              <div class="mb-3">
                <label for="editDescription" class="form-label">Description</label>
                <textarea
                  class="form-control"
                  id="editDescription"
                  v-model="editingTicket.description"
                  rows="3"
                ></textarea>
              </div>
              
              <div class="mb-3">
                <label for="editStatus" class="form-label">Status *</label>
                <select
                  class="form-select"
                  :class="{ 'is-invalid': editErrors.status }"
                  id="editStatus"
                  v-model="editingTicket.status"
                  @change="clearEditError('status')"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <div v-if="editErrors.status" class="text-danger small mt-1">{{ editErrors.status }}</div>
              </div>
              
              <div class="mb-3">
                <label for="editPriority" class="form-label">Priority</label>
                <select class="form-select" id="editPriority" v-model="editingTicket.priority">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">Update Ticket</button>
                <button type="button" class="btn btn-secondary" @click="editingTicket = null">Cancel</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Tickets List -->
        <div class="row g-4">
          <div v-for="ticket in ticketsStore.tickets" :key="ticket.id" class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm rounded-3 border-0">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                  <h5 class="card-title">{{ ticket.title }}</h5>
                  <span 
                    class="badge rounded-pill status"
                    :class="getStatusClass(ticket.status)"
                  >
                    {{ ticket.status.replace('_', ' ') }}
                  </span>
                </div>
                
                <p class="card-text text-muted" v-if="ticket.description">{{ ticket.description }}</p>
                <p class="card-text text-muted" v-else>No description provided</p>
                
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <small class="text-muted">{{ formatDate(ticket.createdAt) }}</small>
                  <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-outline-primary" @click="startEditing(ticket)">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" @click="confirmDelete(ticket.id)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No tickets message -->
        <div v-if="ticketsStore.tickets.length === 0" class="text-center py-5">
          <p class="text-muted">No tickets found. Create your first ticket!</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useTicketStore, type Ticket } from '@/stores/tickets';
import Header from '@/components/Layout/Header.vue';
import Footer from '@/components/Layout/Footer.vue';

const router = useRouter();
const authStore = useAuthStore();
const ticketsStore = useTicketStore();

// Ensure tickets are loaded
onMounted(() => {
  ticketsStore.loadTickets();
});

// Create ticket form
const showCreateForm = ref(false);
const newTicket = ref({
  title: '',
  description: '',
  status: '' as 'open' | 'in_progress' | 'closed' | '',
  priority: 'medium' as 'low' | 'medium' | 'high'
});

// Validation errors for create form
const errors = reactive({
  title: '',
  status: ''
});

// Validation errors for edit form
const editErrors = reactive({
  title: '',
  status: ''
});

// Editing ticket
const editingTicket = ref<Ticket | null>(null);

// Delete confirmation
const ticketToDelete = ref<string | null>(null);

// Validate form data
const validateTicket = (ticket: { title: string; status: string }) => {
  let isValid = true;
  
  // Reset errors
  errors.title = '';
  errors.status = '';
  editErrors.title = '';
  editErrors.status = '';
  
  if (!ticket.title.trim()) {
    if (editingTicket.value) {
      editErrors.title = 'Title is required';
    } else {
      errors.title = 'Title is required';
    }
    isValid = false;
  }
  
  if (!ticket.status) {
    if (editingTicket.value) {
      editErrors.status = 'Status is required';
    } else {
      errors.status = 'Status is required';
    }
    isValid = false;
  } else if (!['open', 'in_progress', 'closed'].includes(ticket.status)) {
    if (editingTicket.value) {
      editErrors.status = 'Status must be open, in_progress, or closed';
    } else {
      errors.status = 'Status must be open, in_progress, or closed';
    }
    isValid = false;
  }
  
  return isValid;
};

// Create a new ticket
const createTicket = () => {
  if (validateTicket(newTicket.value)) {
    try {
      ticketsStore.createTicket({
        title: newTicket.value.title,
        description: newTicket.value.description,
        status: newTicket.value.status as 'open' | 'in_progress' | 'closed',
        priority: newTicket.value.priority
      });
      
      // Reset form
      newTicket.value = {
        title: '',
        description: '',
        status: '',
        priority: 'medium'
      };
      showCreateForm.value = false;
      
      // Show success message
      showSuccessToast('Ticket created successfully!');
    } catch (error) {
      showErrorToast('Failed to create ticket. Please try again.');
    }
  }
};

// Start editing a ticket
const startEditing = (ticket: Ticket) => {
  editingTicket.value = { ...ticket }; // Create a copy to avoid direct mutation
};

// Update a ticket
const updateTicket = () => {
  if (editingTicket.value && validateTicket(editingTicket.value)) {
    try {
      ticketsStore.updateTicket(
        editingTicket.value.id,
        {
          title: editingTicket.value.title,
          description: editingTicket.value.description,
          status: editingTicket.value.status,
          priority: editingTicket.value.priority
        }
      );
      
      editingTicket.value = null;
      showSuccessToast('Ticket updated successfully!');
    } catch (error) {
      showErrorToast('Failed to update ticket. Please try again.');
    }
  }
};

// Confirm delete action
const confirmDelete = (id: string) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    deleteTicket(id);
  }
};

// Delete a ticket
const deleteTicket = (id: string) => {
  try {
    ticketsStore.deleteTicket(id);
    showSuccessToast('Ticket deleted successfully!');
  } catch (error) {
    showErrorToast('Failed to delete ticket. Please try again.');
  }
};

// Helper to get status class for styling
const getStatusClass = (status: string) => {
  switch (status) {
    case 'open':
      return 'open';
    case 'in_progress':
      return 'in_progress';
    case 'closed':
      return 'closed';
    default:
      return 'closed';
  }
};

// Format date for display
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Clear error for specific field
const clearError = (field: keyof typeof errors) => {
  errors[field] = '';
};

// Clear error for edit form
const clearEditError = (field: keyof typeof editErrors) => {
  editErrors[field] = '';
};

// Show success toast (using alert as placeholder since Toast component might not be available here)
const showSuccessToast = (message: string) => {
  alert(message); // Replace with actual toast implementation if needed
};

// Show error toast
const showErrorToast = (message: string) => {
  alert(message); // Replace with actual toast implementation if needed
};

// Handle logout
const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>