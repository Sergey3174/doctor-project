const express = require("express");
const router = express.Router();
const { getApplications } = require("../application.controller");

router.get("/protected", async (req, res) => {
  try {
    res.json({ message: "OK" });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await getApplications();
    res.json({ posts });
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
