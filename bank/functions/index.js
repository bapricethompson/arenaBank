const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

// Init
admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Routers
const userRoutes = require("./routes/users");
const gameRoutes = require("./routes/games");
const playerRoutes = require("./routes/players");

app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/players", playerRoutes);

// Export the API
exports.api = functions.https.onRequest(app);
