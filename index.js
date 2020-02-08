const env = require("./env");

const express = require("express");
const app = express();
app.use(require("cookie-parser")());

// Simple home route
app.get("/", (req, res) => {
  res.send("Visit /authorize to begin");
});

// OAuth2 Originator
app.get("/authorize", require("./routes/authorize"));

// Redirect URI
app.get("/response", require("./routes/response"));

// Get saved tokens
app.get("/tokens", require("./routes/tokens"));

// Get grades
app.get("/grades", require("./routes/grades"));

// Clear all
app.get("/clear", require("./routes/clear"));

console.log(`CanvasCBL API Demo in Node.JS Listening on port ${env.port}!`);
app.listen(env.port);
