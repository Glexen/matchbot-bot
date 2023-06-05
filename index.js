const getBotSettings = require("./getData.js")
const { Telegraf, Markup } = require("telegraf")

require("dotenv").config()

const apiUrl = process.env.API_URL
const apiVersion = process.env.API_VERSION

async function startBot() {
  try {
    const data = await getBotSettings()
    const bot = new Telegraf(data.botToken)
    bot.hears("/start", async (ctx) => {
      const languageButtons = data.languages.map((language) => [
        Markup.button.callback(language.name, `language_${language.id}`)
      ])
      await ctx.reply("Select your language", Markup.inlineKeyboard(languageButtons))
    })
    

    bot.action(/language_(\d+)/, async (ctx) => {
      const languageProfileId = ctx.match[1]
      const telegramId = ctx.from.id
      try {
        const response = await fetch(`${apiUrl}/${apiVersion}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ languageProfileId, telegramId }),
        })
        
      } catch (error) {
        console.error("Error sending request to the API:", error)
      }
      const selectedLanguage = data.languages.find((language) => language.id == Number(languageProfileId))
      const helloMessage = selectedLanguage.helloMessage
      await ctx.reply(helloMessage)
      const formDataResponse = await fetch(`${apiUrl}/${apiVersion}/formField/${languageProfileId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const formData = await formDataResponse.json()
      for (const field of formData) {
        await ctx.reply(field.question)
      }})



    bot.launch()
    
  } catch (error) {
    console.error("Error starting the bot:", error)
  }
}

startBot()
