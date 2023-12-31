import telebot from "telebot";
import config from "./config.js";

const bot = new telebot(config.token);

const RM_Home = bot.keyboard([
  ['Создать QR-code ✏️'],
  ['Обратная связь 🛠']
], { resize: true });

export default RM_Home;
