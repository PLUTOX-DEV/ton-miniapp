import { useEffect, useState } from "react";
import { sendTelegramUser } from "../api/telegram";

const TelegramLogin = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    // Validate Telegram Mini App environment
    if (!tg || !tg.initDataUnsafe || !tg.initDataUnsafe.user) {
      setMessage({ type: "error", text: "Telegram WebApp not detected or user not available." });
      setLoading(false);
      return;
    }

    const userData = tg.initDataUnsafe;

    const extractedUserData = {
      id: userData.user.id,
      first_name: userData.user.first_name,
      last_name: userData.user.last_name,
      username: userData.user.username,
      photo_url: userData.user.photo_url,
      auth_date: userData.auth_date,
      hash: userData.hash,
    };

    // Send data to backend
    sendTelegramUser(extractedUserData)
      .then((res) => {
        localStorage.setItem("access_token", res.access_token);
        setMessage({ type: "success", text: "Logged in successfully!" });
      })
      .catch((err) => {
        console.error("Telegram login error:", err);
        setMessage({ type: "error", text: "Failed to authenticate." });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="text-center mt-4">
      {loading && <p className="text-gray-600">Authenticating with Telegram...</p>}
      {!loading && message.type === "error" && (
        <p className="text-red-500 font-medium">{message.text}</p>
      )}
      {!loading && message.type === "success" && (
        <p className="text-green-600 font-medium">{message.text}</p>
      )}
    </div>
  );
};

export default TelegramLogin;
