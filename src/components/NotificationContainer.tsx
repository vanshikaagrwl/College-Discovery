"use client";

import { useNotifications } from "@/context/NotificationContext";
import { useEffect } from "react";

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

function NotificationToast({
  notification,
  onClose,
}: {
  notification: any;
  onClose: () => void;
}) {
  const { type, title, message } = notification;

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "ℹ️";
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className={`${getBgColor()} text-white p-4 rounded-lg shadow-lg max-w-sm fade-in`}
    >
      <div className="flex items-start space-x-3">
        <span className="text-lg">{getIcon()}</span>
        <div className="flex-1">
          <h4 className="font-semibold">{title}</h4>
          {message && <p className="text-sm opacity-90">{message}</p>}
        </div>
        <button
          onClick={onClose}
          className="text-white hover:opacity-75 text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
}
