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

const addFavoriteProgram = (req, res) => {
  if (!req.session.user) {
    console.log("Unauthorized access");
    res.status(403).json({ error: "Not logged in" });
    return;
  }

  const programId = req.body.programId;
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

    res.json({ success: "Favorite program added" });
  });
};

module.exports = {
  getAllFavoritePrograms,
  addFavoriteProgram,
};
