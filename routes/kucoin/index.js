const express = require("express");
const router = express.Router();
const KucoinController = require("../../controllers/KucoinController");

router.get("/market/:symbol", KucoinController.getMarketDetails);
router.get("/marketdata", KucoinController.viewMarketData);

router.post("/trade", async (req, res) => {
  try {
    const symbol = "BTCUSDTM"; // Replace with a symbol from KuCoin Futures
    const startAt = Math.floor((Date.now() - 3600 * 1000) / 1000); // 1 hour ago
    const endAt = Math.floor(Date.now() / 1000);

    await KucoinController.trade(symbol, startAt, endAt);
    console.log("Trade executed successfully");
    res.status(200).send("Trade executed and insights logged");
  } catch (error) {
    console.error("Failed to execute trade:", error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
