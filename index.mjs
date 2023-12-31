import telebot from "telebot";
import config from "./config.js";
import RM_Home from "./keyboard.mjs";
import generateQrCode from "./generator/generateQrCode.mjs";
import isLink from "./helpers/isLink.mjs";
import createUrl from "./helpers/createImageUrl.mjs";

const bot = new telebot(config.token);

bot.on('text', async (msg) => {
  try {
    const userId = msg.from.id;
    const text = msg.text;

    switch (text) {
      case '/start':
        const startMessage = 'Привет! Я бот, который поможет тебе сгенерировать нужный QR-code.\nДля того чтобы сгенерировать QR-code, нажми на кнопку «Создать QR-code ✏️» и затем пришли ссылку, по которой будет сгенерировано изображение :)';
        bot.sendMessage(userId, startMessage, { replyMarkup: RM_Home });
        break;

      case 'Создать QR-code ✏️':
        bot.sendMessage(userId, 'Для генерации QR-code пришлите мне ссылку в чистом ввиде без текста.\nНапример «https://example.com»', { replyMarkup: RM_Home });
        break;

      case 'Обратная связь 🛠':
        bot.sendMessage(userId, 'Если возникли проблемы напишите разработчику бота -->  @vadiiiik0', { replyMarkup: RM_Home });
        break;

      default:
        try {
          const textIsLink = isLink(text);
          if (textIsLink) {
            bot.sendMessage(userId, 'Генерация QR-code...');
            const url = await createUrl(text);
            const imageQrCode = await generateQrCode(url);
            bot.sendPhoto(userId, imageQrCode, { caption: 'Ваш QR-code' });

          } else {
            bot.sendMessage(userId, 'Я не знаю, что вам ответить :(');
          };
        } catch (error) {
          console.error(error);
        }
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

bot.start();