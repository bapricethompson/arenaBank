const express = require("express");
const router = express.Router();
const db = require("firebase-admin").database();

// Utility to generate a unique 6-digit code
async function generateUniqueGameCode() {
  // Load existing codes
  const snapshot = await db.ref("games").once("value");
  const games = snapshot.val() || {};

  const existingCodes = new Set(
    Object.values(games)
      .map((game) => game.code)
      .filter(Boolean)
  );

  let newCode;
  let tries = 0;
  const MAX_TRIES = 1000;

  do {
    if (tries >= MAX_TRIES) {
      throw new Error("Failed to generate unique code after max tries");
    }
    newCode = Math.floor(100000 + Math.random() * 900000).toString();
    tries++;
  } while (existingCodes.has(newCode));

  return newCode;
}

// CREATE
router.post("/", async (req, res) => {
  try {
    const { hostId, groupSize, rounds, name } = req.body;

    if (!hostId) return res.status(400).send("Missing hostId");
    if (typeof groupSize !== "number" || groupSize <= 0)
      return res.status(400).send("Invalid or missing groupSize");
    if (typeof rounds !== "number" || rounds <= 0)
      return res.status(400).send("Invalid or missing rounds");
    if (!name || typeof name !== "string")
      return res.status(400).send("Missing or invalid name");

    const gameRef = db.ref("games").push(); // auto-generated key
    const gameId = gameRef.key;
    const gameCode = await generateUniqueGameCode();

    const gameData = {
      id: gameId,
      hostId,
      createdAt: Date.now(),
      inPlay: false,
      ended: false,
      code: gameCode,
      groupSize,
      rounds,
      name,
    };

    await gameRef.set(gameData);

    res.status(201).json({
      message: "Game created",
      gameId,
      code: gameCode,
    });
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).send("Server error");
  }
});

// READ
router.get("/:gameId", async (req, res) => {
  const snapshot = await db.ref(`games/${req.params.gameId}`).once("value");
  res.status(200).json(snapshot.val());
});

router.get("/code/:gameCode", async (req, res) => {
  const { gameCode } = req.params;

  try {
    // Query games where code === gameCode
    const snapshot = await db
      .ref("games")
      .orderByChild("code")
      .equalTo(gameCode)
      .once("value");

    const games = snapshot.val();

    if (!games) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Since code is unique, return the first match
    const gameId = Object.keys(games)[0];
    const game = games[gameId];

    res.status(200).json(game);
  } catch (error) {
    console.error("Error fetching game by code:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE
router.patch("/:gameId", async (req, res) => {
  const { inPlay, ended } = req.body;

  // Prepare update object only with allowed fields
  const updateData = {};
  if (typeof inPlay === "boolean") updateData.inPlay = inPlay;
  if (typeof ended === "boolean") updateData.ended = ended;

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      error:
        "No valid fields to update. Provide inPlay and/or ended as booleans.",
    });
  }

  try {
    await db.ref(`games/${req.params.gameId}`).update(updateData);
    res
      .status(200)
      .json({ message: "Game updated", updatedFields: updateData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:gameId", async (req, res) => {
  await db.ref(`games/${req.params.gameId}`).remove();
  res.status(200).send("Game deleted");
});

module.exports = router;
