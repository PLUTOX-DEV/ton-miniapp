// src/components/TelegramLogin.jsx
import React, { useEffect, useState } from "react";
import { sendTelegramUser } from "../api/telegram"; // update the path if needed

const TelegramLogin = () => {
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    if (window.Telegram.WebApp) {
      const tgUser = window.Telegram.WebApp.initDataUnsafe.user;

      if (!tgUser) {
        setStatus("No Telegram user detected.");
        return;
      }

      const authData = {
        id: tgUser.id,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        username: tgUser.username,
        photo_url: tgUser.photo_url,
        auth_date: window.Telegram.WebApp.initDataUnsafe.auth_date,
        hash: window.Telegram.WebApp.initDataUnsafe.hash,
      };

      sendTelegramUser(authData)
        .then((data) => {
          setStatus("Login successful ✅");
          console.log("Response:", data);
        })
        .catch((err) => {
          setStatus("Login failed ❌");
          console.error("Error sending Telegram user:", err);
        });
    } else {
      setStatus("Telegram WebApp not found.");
    }
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold">Telegram Login</h2>
      <p>{status}</p>
    </div>
  );
};

export default TelegramLogin;
