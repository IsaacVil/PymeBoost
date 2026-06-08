"use client";
// Observer Pattern consumer: subscribes to notificationStore events

import { useEffect } from "react";
import { useNotificationStore, Notification } from "@/store/notificationStore";

interface UseNotificationsReturn {
  notifications: Notification[];
  dismiss: (id: string) => void;
  notify: (n: Omit<Notification, "id" | "timestamp">) => void;
}

export function useNotifications(): UseNotificationsReturn {
  const { notifications, publish, dismiss } = useNotificationStore();

  return {
    notifications,
    notify: publish,
    dismiss,
  };
}

// Subscribe to specific notification types across features
export function useNotificationSubscriber(
  onNotification: (n: Notification) => void
) {
  const { subscribe } = useNotificationStore();

  useEffect(() => {
    const unsubscribe = subscribe(onNotification);
    return unsubscribe;
  }, [subscribe, onNotification]);
}
