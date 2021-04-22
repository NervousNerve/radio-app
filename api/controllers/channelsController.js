const fetch = require("node-fetch");

async function getAllChannels(req, res) {
  let data = await fetch(
    "http://api.sr.se/api/v2/channels?format=json&pagination=false"
  );
  data = await data.json();
  res.send(data.channels);
}

async function getChannel(req, res) {
  try {
    const response = await fetch(
      `http://api.sr.se/api/v2/channels/${req.params.id}?format=json`
    );
    const data = await response.json();
    res.send(data.channel);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

module.exports = { getAllChannels, getChannel };
