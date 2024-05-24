const igRoutes = require("./ig");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("IG Trading");
});

router.use("/api/ig", igRoutes);

module.exports = router;
