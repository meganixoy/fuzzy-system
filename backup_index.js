const express = require("express");
const routes = require("./routes");
const IgController = require("./controllers/IgController");
const KuCoinController = require("./controllers/KucoinController");

const app = express();
const PORT = 8080;

// Parse JSON payloads
app.use(express.json());

// Routes
app.use("/", routes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);

//   // Set up the bot to run every 3 minutes
//   const epic = "CS.D.EURUSD.CFD.IP"; // Adjust to your desired EPIC
//   const interval = 1 * 60 * 1000; // 3 minutes in milliseconds

// setInterval(async () => {
//   const startDate = new Date(Date.now() - 3600 * 1000).toISOString();
//   const endDate = new Date().toISOString();
//   const maxPricePoints = 50;
//   const pageSize = 50;
//   const pageNumber = 1;

//   try {
//     await IgController.trade(
//       epic,
//       startDate,
//       endDate,
//       maxPricePoints,
//       pageSize,
//       pageNumber
//     );
//     console.log("Trade executed successfully");
//   } catch (error) {
//     console.error("Failed to execute trade:", error.message);
//   }
// }, interval);
// });

// app.listen(PORT, async () => {
//   console.log(`Server is running on port ${PORT}`);

//   // const epic = "CS.D.EURUSD.CFD.IP"; // EURUSD
//   const epic = "CS.D.BITCOIN.CFD.IP"; // BTC

//   const startDate = new Date(Date.now() - 3600 * 1000).toISOString();
//   const endDate = new Date().toISOString();
//   const maxPricePoints = 50;
//   const pageSize = 50;
//   const pageNumber = 1;

//   try {
//     await IgController.trade(
//       epic,
//       startDate,
//       endDate,
//       maxPricePoints,
//       pageSize,
//       pageNumber
//     );
//     console.log("Trade executed successfully");
//   } catch (error) {
//     console.error("Failed to execute trade:", error.message);
//   }
// });

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  const symbol = "BTC-USDT"; // Replace with a symbol from KuCoin

  const startAt = Math.floor((Date.now() - 3600 * 1000) / 1000); // 1 hour ago
  const endAt = Math.floor(Date.now() / 1000);

  try {
    await KuCoinController.trade(symbol, startAt, endAt);
    console.log("Trade executed successfully");
  } catch (error) {
    console.error("Failed to execute trade:", error.message);
  }
});
