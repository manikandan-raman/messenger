import { useEffect, useState } from "react";

export const useNotification = ({ title, body }) => {
  const [permission, setPermission] = useState("denied");

  useEffect(() => {
    // if (permission === "denied") {
    Notification.requestPermission().then((perm) => {
      alert(perm);
      setPermission(perm);
      const show = new Notification(title, {
        body,
      });

      setTimeout(() => show.close(), 3000);
    });
    // }
  }, []);
};
