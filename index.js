const getBotSettings = require("./getData.js")
const { Telegraf, Markup } = require("telegraf")

async function startBot() {
  try {
    const data = await getBotSettings()
    const bot = new Telegraf(data.botToken)
    bot.hears("/start", async (ctx) => {
      await ctx.reply(data.helloMessage)
    })
    bot.launch()
  } catch (error) {
    console.error("Error starting the bot:", error)
  }
}

startBot()
