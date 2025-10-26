import { defineStore } from "pinia";
import { ref } from "vue";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

export const useTicketStore = defineStore("tickets", () => {
  const tickets = ref<Ticket[]>([]);

  // Load tickets from localStorage on initialization
  const loadTickets = () => {
    const saved = localStorage.getItem("tickets");
    if (saved) {
      tickets.value = JSON.parse(saved);
    }
  };

  // Save tickets to localStorage
  const saveTickets = () => {
    localStorage.setItem("tickets", JSON.stringify(tickets.value));
  };

  // Create ticket
  const createTicket = (ticketData: Omit<Ticket, "id" | "createdAt">) => {
    const newTicket: Ticket = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      createdAt: new Date().toISOString(),
      ...ticketData,
    };
    tickets.value.push(newTicket);
    saveTickets();
  };

  // Update ticket
  const updateTicket = (id: string, updated: Partial<Ticket>) => {
    const index = tickets.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      tickets.value[index] = { ...tickets.value[index], ...updated };
      saveTickets();
    }
  };

  // Delete ticket
  const deleteTicket = (id: string) => {
    tickets.value = tickets.value.filter((t) => t.id !== id);
    saveTickets();
  };

  // Get tickets by status
  const getTicketsByStatus = (status: Ticket["status"]) => {
    return tickets.value.filter((t) => t.status === status);
  };

  return {
    tickets,
    loadTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketsByStatus,
  };
});
