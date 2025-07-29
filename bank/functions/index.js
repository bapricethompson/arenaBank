const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

// Init
admin.initializeApp();
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://db-homeschool.web.app",
    "https://dbhomeschool.com",
    "https://us-central1-db-homeschool.cloudfunctions.net",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/test", (req, res) => {
  console.log("🔥 HIT /test route");
  res.status(200).json({ message: "Test route working" });
});

// Routers
const userRoutes = require("./routes/users");
const gameRoutes = require("./routes/games");
const playerRoutes = require("./routes/players");

app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/players", playerRoutes);

// Export the API
exports.api = functions.https.onRequest(app);
