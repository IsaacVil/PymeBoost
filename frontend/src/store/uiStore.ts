// Singleton Pattern: single instance for global UI state
import { create } from "zustand";

interface Modal {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface UIStore {
  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // Modals
  activeModal: Modal | null;
  openModal: (modal: Modal) => void;
  closeModal: () => void;

  // Theme
  theme: "dark";
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  activeModal: null,
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),

  theme: "dark",
}));
