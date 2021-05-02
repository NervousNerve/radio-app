const fetch = require("node-fetch");

async function getSchedule(req, res) {
  if (!req.query.channel) {
    console.log("No channel specified!", req.query.channel);
    res.status(400).send();
    return;
  }

  const date =
    req.query.date ||
    new Date(Date.now()).toLocaleString("sv-SE", {
      dateStyle: "short",
    });

  try {
    const url = `http://api.sr.se/api/v2/scheduledepisodes?channelid=${req.query.channel}&date=${date}&format=json&pagination=false`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log("Request:", url);
      console.log(`Response: ${response.status} ${response.statusText}`);
      res.status(response.status).send();
      return;
    }

    const data = await response.json();
    res.send(data.schedule);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

module.exports = { getSchedule };
