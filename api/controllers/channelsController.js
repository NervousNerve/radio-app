const fetch = require("node-fetch");

async function getAllChannels(req, res) {
  let data = await fetch("http://api.sr.se/api/v2/channels?format=json");
  data = await data.json();
  res.send(data.channels);
}

module.exports = { getAllChannels };
