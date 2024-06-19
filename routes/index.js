const igRoutes = require("./ig");
const kucoinRoutes = require("./kucoin");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("BOT Trading");
});

router.use("/api/ig", igRoutes);
router.use("/api/kucoin", kucoinRoutes);

module.exports = router;
