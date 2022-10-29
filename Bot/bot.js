const { Telegraf } = require("telegraf");
const BOT_TOKEN = "5652910016:AAH-TGC0tKm7CxVyeOuvqqh0NCI_aNG9wbo";
const bot = new Telegraf(BOT_TOKEN);
const textHelp = `
/start - Start bot
/help - Show commands
/menu - show menu
`;

const web_link = "https://alexandr2309.github.io/telegram-bot/";

bot.start((ctx) => ctx.reply(`Hi! ${ctx.message.from.first_name} ${textHelp}`));
bot.help((ctx) => ctx.reply(textHelp));

bot.command("menu", async (ctx) => {
  try {
    await ctx.reply("Menu", {
      reply_markup: {
        keyboard: [[{ text: "Order Food", web_app: { url: web_link } }]],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

bot.on("web_app_data", async (ctx) => {
  try {
    await ctx.reply(ctx.message.web_app_data.data);
  } catch (error) {
    console.error(error);
  }
});
bot.launch();
