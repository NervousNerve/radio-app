const sqlite3 = require("sqlite3");
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../../usersdb.db"));

const getAllFavoritePrograms = (req, res) => {
  if (!req.session.user) {
    console.log("Unauthorized access");
    res.status(403).json({ error: "Not logged in" });
    return;
  }

  const query = `SELECT * FROM favoritePrograms WHERE userId = $userId`;
  const params = { $userId: req.session.user.id };

  db.all(query, params, (err, results) => {
    res.json(results.map((row) => row.programId));
  });
};

const getAllFavoriteChannels = (req, res) => {
  if (!req.session.user) {
    console.log("Unauthorized access");
    res.status(403).json({ error: "Not logged in" });
    return;
  }

  const query = `SELECT * FROM favoriteChannels WHERE userId = $userId`;
  const params = { $userId: req.session.user.id };

  db.all(query, params, (err, results) => {
    res.json(results.map((row) => row.channelId));
  });
};

const addFavoriteProgram = (req, res) => {
  if (!req.session.user) {
    console.log("Unauthorized access");
    res.status(403).json({ error: "Not logged in" });
    return;
  }

  const programId = req.body.id;
  const query = `
    INSERT INTO favoritePrograms (userId, programId)
    VALUES ($userId, $programId)`;
  const params = { $userId: req.session.user.id, $programId: programId };

  db.run(query, params, (err) => {
    if (err) {
      console.log(err);
      if (err.errno == 19) res.status(403).json({ error: "Duplicate entry" });
      else res.status(400).json({ error: err });
      return;
    }

    res.json({ success: "Program added" });
  });
};

const addFavoriteChannel = (req, res) => {
  if (!req.session.user) {
    console.log("Unauthorized access");
    res.status(403).json({ error: "Not logged in" });
    return;
  }

  const channelId = req.body.id;
  const query = `
    INSERT INTO favoriteChannels (userId, channelId)
    VALUES ($userId, $channelId)`;
  const params = { $userId: req.session.user.id, $channelId: channelId };

  db.run(query, params, (err) => {
    if (err) {
      console.log(err);
      if (err.errno == 19) res.status(403).json({ error: "Duplicate entry" });
      else res.status(400).json({ error: err });
      return;
    }

    res.json({ success: "Channel added" });
  });
};

const deleteFavoriteChannel = (req, res) => {
  if (!req.session.user) {
    console.log("Unauthorized access");
    res.status(403).json({ error: "Not logged in" });
    return;
  }

  const query = `DELETE FROM favoriteChannels WHERE channelId = $channelId`;
  const params = { $channelId: req.params.id };

  db.run(query, params, (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: err });
      return;
    }
    res.json({ success: "Channel deleted" });
  });
};

const deleteFavoriteProgram = (req, res) => {
  if (!req.session.user) {
    console.log("Unauthorized access");
    res.status(403).json({ error: "Not logged in" });
    return;
  }

  const query = `DELETE FROM favoritePrograms WHERE programId = $programId`;
  const params = { $programId: req.params.id };

  db.run(query, params, (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: err });
      return;
    }
    res.json({ success: "Program deleted" });
  });
};

module.exports = {
  getAllFavoriteChannels,
  getAllFavoritePrograms,
  addFavoriteChannel,
  addFavoriteProgram,
  deleteFavoriteChannel,
  deleteFavoriteProgram,
};
