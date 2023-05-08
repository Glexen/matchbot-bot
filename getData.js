const apiUrl = "http://localhost:3000/api";

const getData = (app, command, id = "") => {
  return fetch(`${apiUrl}/${app}/${command}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const getBotToken = () => {
  return getData("botSetting", "getBotToken");
};

const getHelloMessage = () => {
  return getData("languageProfile", "getHelloMessage", "1");
};

const getLanguages = () => { 
    return getData("languageProfile", "all")
}
const getAllData = () => {
  const botToken = getBotToken().then((botToken) => {
    return { botToken }
  })
  const helloMessage = getHelloMessage().then((helloMessage) => {
    return { helloMessage }
  })
  const languages = getLanguages().then((languages) => {
    return { languages }
  })

  return Promise.all([botToken, helloMessage, languages]).then((results) => {
    const data = results.reduce((accumulator, result) => {
      return { ...accumulator, ...result };
    }, {});
    return data;
  });
};

module.exports = getAllData;
