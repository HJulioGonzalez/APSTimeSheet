const { quotes } = require("./data.js");
module.exports.getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};
