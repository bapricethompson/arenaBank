const express = require("express");
const router = express.Router();
const db = require("firebase-admin").database();

// PATCH route: update username by userId
router.patch("/:userId", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "username is required" });

  try {
    const userRef = db.ref(`users/${req.params.userId}`);
    const snapshot = await userRef.once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    await userRef.update({ username });
    res
      .status(200)
      .json({ message: "Username updated", userId: req.params.userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modified POST route: create user or update username if email exists
router.post("/", async (req, res) => {
  const { username, email } = req.body;
  if (!email || !username) {
    return res.status(400).json({ error: "email and username are required" });
  }

  try {
    // Check if email exists
    const snapshot = await db
      .ref("users")
      .orderByChild("email")
      .equalTo(email)
      .once("value");

    if (snapshot.exists()) {
      // Email exists, update username for that user
      const users = snapshot.val();
      const existingUserId = Object.keys(users)[0];

      await db.ref(`users/${existingUserId}`).update({ username });

      return res
        .status(200)
        .json({ message: "Username updated", userId: existingUserId });
    }

    // Email does not exist, create new user
    const newUserRef = db.ref("users").push();
    await newUserRef.set({ username, email });

    res.status(201).json({ message: "User created", userId: newUserRef.key });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ user by userId
router.get("/:userId", async (req, res) => {
  try {
    const snapshot = await db.ref(`users/${req.params.userId}`).once("value");
    if (!snapshot.exists())
      return res.status(404).json({ error: "User not found" });

    res.status(200).json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE user by userId
router.delete("/:userId", async (req, res) => {
  try {
    await db.ref(`users/${req.params.userId}`).remove();
    res.status(200).send("User deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
``;
