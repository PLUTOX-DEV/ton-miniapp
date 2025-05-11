import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import TelegramLogin from "./components/TelegramLogin";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize Telegram WebApp
    WebApp.ready();

    // Get Telegram user object
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

    if (tgUser) {
      setUser(tgUser);
    } else {
      console.warn(
        "Telegram user not found. Make sure you're running this inside the Telegram Mini App."
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">🛍 TON Mini Commerce</h1>

      {/* Authentication handled in this component */}
      <TelegramLogin />

      {user ? (
        <p className="mt-4 text-lg text-gray-800">
          Hello, {user.first_name} {user.last_name || ""}
        </p>
      ) : (
        <p className="mt-4 text-gray-500">Waiting for Telegram user info...</p>
      )}
    </div>
  );
}

export default App;
