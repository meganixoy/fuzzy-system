const express = require("express");
const router = express.Router();
const IgController = require("../../controllers/IgController");

router.get("/market/:epic", IgController.getMarketDetails);
router.get("/marketdata", IgController.viewMarketData);

router.post("/trade/:epic", async (req, res) => {
  const { startDate, endDate, maxPricePoints, pageSize, pageNumber } = req.body;
  try {
    await IgController.trade(
      req.params.epic,
      startDate,
      endDate,
      maxPricePoints,
      pageSize,
      pageNumber
    );
    res.status(200).send("Trade executed");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
