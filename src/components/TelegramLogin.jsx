import React, { useEffect } from "react";
import { sendTelegramUser } from "../api/telegram"; // adjust the path as needed

const TelegramLogin = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute("data-telegram-login", "YourBotUsername"); // No @ symbol
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "true");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "handleTelegramAuth(user)");
    script.async = true;

    document.getElementById("telegram-button").appendChild(script);

    window.handleTelegramAuth = async function (user) {
      try {
        const data = await sendTelegramUser(user);
        console.log("Authenticated:", data);
        // Save token or update UI accordingly
      } catch (err) {
        console.error("Auth error:", err);
      }
    };
  }, []);

  return <div id="telegram-button"></div>;
};

export default TelegramLogin;
