export function requestNotificationPermission() {
  if (typeof window !== "undefined" && "Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        console.log("Permission status:", permission);
      });
    }
  }
}

export function showNotification(title, options) {
  if (typeof window !== "undefined" && Notification.permission === "granted") {
    new Notification(title, options);
  }
}
