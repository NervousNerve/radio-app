const sqlite3 = require("sqlite3");
const path = require("path");
const encrypt = require("../encrypt");

const db = new sqlite3.Database(path.join(__dirname, "../../usersdb.db"));

const whoami = (req, res) => {
  res.json(req.session.user || null);
};

const login = (req, res) => {
  const query = `SELECT * FROM users WHERE email = $email`;
  const params = { $email: req.body.email };
  db.get(query, params, (err, userInDB) => {
    if (!userInDB) {
      console.log("Unauthorized login attempt:", req.body);

      res.status(401).json({ error: "Bad credentials" });
      return;
    }

    req.body.password = encrypt(req.body.password);
    if (userInDB.password !== req.body.password) {
      console.log("Unauthorized login attempt:", req.body);

      res.status(401).json({ error: "Bad credentials" });
      return;
    }

    delete userInDB.password;
    req.session.user = userInDB;
    console.log(
      "Logged in:",
      req.session.user.firstName,
      req.session.user.lastName
    );
    res.json({ success: "Login successful", user: userInDB });
  });
};

const logout = (req, res) => {
  console.log("Logged out:", req.session.user.userName);
  delete req.session.user;
  res.json({ success: "Logged out successfully" });
};

const register = (req, res) => {
  const userToRegister = req.body;

  if (
    !userToRegister.email ||
    !userToRegister.firstName ||
    !userToRegister.lastName ||
    !userToRegister.password
  ) {
    res.status(400).json({ error: "Unrecognized request body" });
    return;
  }

  userToRegister.password = encrypt(userToRegister.password);

  const query = `
    INSERT INTO users (email, firstName, lastName, password)
    VALUES ($email, $firstName, $lastName, $password)`;
  const params = {
    $email: userToRegister.email,
    $firstName: userToRegister.firstName,
    $lastName: userToRegister.lastName,
    $password: userToRegister.password,
  };
  db.run(query, params, (err) => {
    if (err) {
      console.log(err);
      if (err.errno == 19)
        res.status(403).json({ error: "Email already exists" });
      else res.status(400).json({ error: err });
      return;
    }

    res.json({
      success: "User registered successfully",
      lastId: this.lastID,
    });
  });
};

module.exports = { whoami, login, logout, register };
