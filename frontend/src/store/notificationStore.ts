// Observer Pattern (Pub-Sub): Decouples notification producers from consumers
// Why: When contracts accept or milestones update, 5+ features must react
//       Without Observer, components need direct imports or prop drilling = fragile code

import { create } from "zustand";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  timestamp: number;
}

interface NotificationStore {
  notifications: Notification[];
  subscribers: Set<(notification: Notification) => void>;

  // Actions
  publish: (notification: Omit<Notification, "id" | "timestamp">) => void;
  dismiss: (id: string) => void;
  subscribe: (callback: (notification: Notification) => void) => () => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  subscribers: new Set(),

  publish: (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Notify all subscribers (other features listening to events)
    get().subscribers.forEach((callback) => {
      callback(newNotification);
    });

    // Auto-dismiss after duration
    if (notification.duration) {
      setTimeout(() => {
        get().dismiss(newNotification.id);
      }, notification.duration);
    }
  },

  dismiss: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  subscribe: (callback: (notification: Notification) => void) => {
    get().subscribers.add(callback);
    // Return unsubscribe function
    return () => {
      get().subscribers.delete(callback);
    };
  },

  clear: () => {
    set({ notifications: [] });
  },
}));
