const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const app = express();

app.use((req, res, next) => {
  console.log("🔍 Origin:", req.headers.origin);
  next();
});

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8081",
  "https://lhtcugo-anonymous-8081.exp.direct",
  "https://arenabank-3a693.web.app",
  "https://us-central1-arenabank-3a693.cloudfunctions.net",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ Blocked CORS for origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
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
