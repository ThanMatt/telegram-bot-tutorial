const BOT = require("telegraf");
const Markup = require("telegraf/markup");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const WizardScene = require("telegraf/scenes/wizard");
const loveCalculator = require("./loveCalculator.js");

const TOKEN = "";

// !! Bot Initialization
const bot = new BOT.Telegraf(TOKEN);

bot.start((context) => {
  context.reply(
    `Hello ${context.from.first_name}, gusto mo ba ng jowa?`,
    Markup.inlineKeyboard([
      Markup.callbackButton("Love Calculate", "LOVE_CALCULATE"),
    ]).extra()
  );
});

const loveCalculate = new WizardScene(
  "love_calculate",
  // !! First step - enter your name
  (context) => {
    context.reply("Please enter your name");
    return context.wizard.next();
  },

  // !! Second step - enter partner name
  (context) => {
    context.wizard.state.yourName = context.message.text;
    context.reply("Enter the name of your partner");
    return context.wizard.next();
  },

  // !! Third step - generation of percentage
  (context) => {
    const partnerName = context.message.text;
    const firstName = context.wizard.state.yourName;

    loveCalculator.getPercentage(firstName, partnerName).then((response) => {
      if (response.data.percentage >= 50) {
        context.reply(
          `${response.data.fname} + ${response.data.sname} = 💗${response.data.percentage}%`,
          Markup.inlineKeyboard([
            Markup.callbackButton("Calculate again", "LOVE_CALCULATE"),
          ]).extra()
        );
      } else {
        context.reply(
          `${response.data.fname} + ${response.data.sname} = 🥺${response.data.percentage}%`,
          Markup.inlineKeyboard([
            Markup.callbackButton("Calculate again", "LOVE_CALCULATE"),
          ]).extra()
        );
      }
    });
    return context.scene.leave();
  }
);

const stage = new Stage([loveCalculate], { default: "love_calculate" });
bot.use(session());
bot.use(stage.middleware());

console.log("Bot is launched");
bot.launch();
