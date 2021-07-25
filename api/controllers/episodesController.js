const fetch = require("node-fetch");

async function getAllEpisodes(req, res) {
  if (!req.query.program) {
    console.log("No program specified!", req.query.program);
    res.status(400).send();
    return;
  }

  try {
    const url = `http://api.sr.se/api/v2/episodes/index?programid=${req.query.program}&format=json&pagination=false`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log("Request:", url);
      console.log(`Response: ${response.status} ${response.statusText}`);
      res.status(response.status).send();
      return;
    }

    const data = await response.json();
    res.send(data.episodes);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

async function getEpisode(req, res) {
  try {
    const url = `http://api.sr.se/api/v2/episodes/get?id=${req.params.id}&format=json`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log("Request:", url);
      console.log(`Response: ${response.status} ${response.statusText}`);
      res.status(response.status).send();
      return;
    }

    const data = await response.json();
    res.send(data.episode);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

module.exports = { getAllEpisodes, getEpisode };
