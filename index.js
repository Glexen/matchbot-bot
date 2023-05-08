const getAllData = require("./getData.js")
const { Telegraf, Markup } = require("telegraf")

// console.log(getAllData())

getAllData().then((data) => {
    const bot = new Telegraf(data.botToken)
    bot.hears('/start', (ctx) => {
        ctx.reply(data.helloMessage);
    });
    bot.launch()
  })
  
