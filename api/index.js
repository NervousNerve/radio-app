const express = require("express");
const session = require("express-session");

const userRoutes = require("./routes/userRoutes");
const channelsRoutes = require("./routes/channelsRoutes");

const port = 3001;
const app = express();

app.use(express.json());

app.use(
  session({
    secret: "dd8b4e9e-537f-48e4-8a17-1b5d52eb674c",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/channels", channelsRoutes);

app.listen(port, (err) => {
  if (err) {
    console.error("Server could not start:", err);
    return;
  }
  console.log("Listening on port:", port);
});
