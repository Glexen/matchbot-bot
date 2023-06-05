require("dotenv").config()

const apiUrl = process.env.API_URL
const apiVersion = process.env.API_VERSION

const getData = (app, command, id = "") => {
  return fetch(`${apiUrl}/${apiVersion}/${app}/${command}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
}

const getBotToken = () => {
  return getData("botSetting", "botToken")
}

const getHelloMessage = () => {
  return getData("languageProfile", "helloMessage", "1")
}

const getLanguages = () => {
  return getData("languageProfile","")
}
const getBotSettings = async () => {
  try {
    const [botToken, helloMessage, languages] = await Promise.all([
      getBotToken(),
      getHelloMessage(),
      getLanguages(),
    ])

    return { botToken, helloMessage, languages }
  } catch (error) {
    console.error("Error retrieving bot settings:", error)
    throw error
  }
}

module.exports = getBotSettings
