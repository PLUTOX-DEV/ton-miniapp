import axios from "axios";

export const sendTelegramUser = async (user) => {
  try {
    const response = await axios.post("https://ton-q4mz.onrender.com/api/telegram/auth/", {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      photo_url: user.photo_url,
      auth_date: user.auth_date,
      hash: user.hash,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to send Telegram user:", error);
    throw error;
  }
};
