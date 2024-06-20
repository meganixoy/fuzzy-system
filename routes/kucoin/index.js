const express = require("express");
const router = express.Router();
const KucoinController = require("../../controllers/KucoinController");

router.get("/klines/:symbol", KucoinController.getKlines);

module.exports = router;
