const express = require("express");
const router = express.Router();
const db = require("firebase-admin").database();

// ADD player to game
router.post("/", async (req, res) => {
  const { gameId, userId } = req.body;
  if (!gameId || !userId) {
    return res.status(400).json({ error: "gameId and userId are required" });
  }

  try {
    await db.ref(`players/${gameId}/${userId}`).set({
      score: 0,
      joinedAt: new Date().toISOString(),
    });
    res.status(201).send("Player added with score 0");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET players in game
router.get("/:gameId", async (req, res) => {
  try {
    const snapshot = await db.ref(`players/${req.params.gameId}`).once("value");
    const playersObj = snapshot.val();

    if (!playersObj) {
      return res.status(200).json([]); // No players found
    }

    // Convert to array with userId included
    const playersArray = Object.entries(playersObj).map(
      ([userId, playerData]) => ({
        userId,
        ...playerData,
      })
    );

    // Sort descending by score
    playersArray.sort((a, b) => b.score - a.score);

    res.status(200).json(playersArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH player score update only
router.patch("/:gameId/:userId", async (req, res) => {
  const { score } = req.body;

  if (typeof score !== "number") {
    return res.status(400).json({ error: "score must be a number" });
  }

  try {
    await db
      .ref(`players/${req.params.gameId}/${req.params.userId}`)
      .update({ score });
    res.status(200).send("Player score updated");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE player
router.delete("/:gameId/:userId", async (req, res) => {
  await db.ref(`players/${req.params.gameId}/${req.params.userId}`).remove();
  res.status(200).send("Player removed");
});

module.exports = router;
