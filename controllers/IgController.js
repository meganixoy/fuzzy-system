const axios = require("axios");
require("dotenv").config();
const { EMA, RSI } = require("technicalindicators");
const { OpenAI } = require("openai");

const apiKey = process.env.IG_API_KEY;
const username = process.env.IG_USERNAME;
const password = process.env.IG_PASSWORD;
const apiUrl = process.env.IG_API_URL;
const GPT_API_KEY = process.env.GPT_API_KEY;

const openai = new OpenAI({
  apiKey: GPT_API_KEY,
  organization: process.env.GPT_ORGANIZATION,
  project: process.env.GPT_PROJECT_ID,
});

let cst = "";
let xSecurityToken = "";

const authenticate = async () => {
  try {
    const response = await axios.post(
      `${apiUrl}/session`,
      {
        identifier: username,
        password: password,
      },
      {
        headers: {
          "X-IG-API-KEY": apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    cst = response.headers["cst"];
    xSecurityToken = response.headers["x-security-token"];
  } catch (error) {
    console.error("Failed to authenticate with IG API:", error);
    throw new Error("Internal Server Error");
  }
};

const ensureAuthenticated = async () => {
  if (!cst || !xSecurityToken) {
    await authenticate();
  }
};

const getMarketDetails = async (req, res) => {
  const { epic } = req.params;

  try {
    await ensureAuthenticated();
    const response = await axios.get(`${apiUrl}/markets/${epic}`, {
      headers: {
        "X-IG-API-KEY": apiKey,
        CST: cst,
        "X-SECURITY-TOKEN": xSecurityToken,
        Accept: "application/json",
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Failed to get market details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMarketData = async (
  epic,
  resolution = "MINUTE_3",
  startDate,
  endDate,
  maxPricePoints,
  pageSize,
  pageNumber
) => {
  try {
    await ensureAuthenticated();
    const params = {
      resolution,
      from: startDate,
      to: endDate,
      max: maxPricePoints,
      pageSize,
      pageNumber,
    };

    // Remove undefined parameters
    Object.keys(params).forEach(
      (key) => params[key] === undefined && delete params[key]
    );

    const response = await axios.get(`${apiUrl}/prices/${epic}`, {
      headers: {
        "X-IG-API-KEY": apiKey,
        CST: cst,
        "X-SECURITY-TOKEN": xSecurityToken,
        Accept: "application/json",
        Version: "3",
      },
      params,
    });

    return response.data.prices.map((price) => ({
      time: price.snapshotTime,
      open: parseFloat(price.openPrice.bid),
      high: parseFloat(price.highPrice.bid),
      low: parseFloat(price.lowPrice.bid),
      close: parseFloat(price.closePrice.bid),
    }));
  } catch (error) {
    console.error(
      "Error fetching market data:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch market data");
  }
};

const viewMarketData = async (req, res) => {
  const {
    epic,
    resolution,
    startDate,
    endDate,
    maxPricePoints,
    pageSize,
    pageNumber,
  } = req.query;

  // Validate and parse query parameters
  const maxPricePointsInt = maxPricePoints
    ? parseInt(maxPricePoints, 10)
    : undefined;
  const pageSizeInt = pageSize ? parseInt(pageSize, 10) : undefined;
  const pageNumberInt = pageNumber ? parseInt(pageNumber, 10) : undefined;

  if (!epic) {
    return res.status(400).json({ error: "epic parameter is required" });
  }

  try {
    const marketData = await getMarketData(
      epic,
      resolution,
      startDate,
      endDate,
      maxPricePointsInt,
      pageSizeInt,
      pageNumberInt
    );
    res.status(200).json(marketData);
  } catch (error) {
    console.error("Failed to fetch market data:", error);
    res.status(500).json({ error: "Failed to fetch market data" });
  }
};

const placeOrder = async (order) => {
  try {
    await ensureAuthenticated();

    console.log("Placing order with the following parameters:", order);

    const response = await axios.post(`${apiUrl}/positions/otc`, order, {
      headers: {
        "X-IG-API-KEY": apiKey,
        CST: cst,
        "X-SECURITY-TOKEN": xSecurityToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log(response);

    return response.data;
  } catch (error) {
    console.error(
      "Failed to place order:",
      error.response ? error.response.data : error.message
    );
    if (
      error.response &&
      error.response.data &&
      error.response.data.errorCode === "ATTACHED_ORDER_LEVEL_ERROR"
    ) {
      console.error(
        "ATTACHED_ORDER_LEVEL_ERROR: There might be an issue with the specified stop loss or take profit levels."
      );
    }
    throw new Error("Failed to place order");
  }
};

const confirmOrder = async (dealReference) => {
  try {
    await ensureAuthenticated();

    const response = await axios.get(`${apiUrl}/confirms/${dealReference}`, {
      headers: {
        "X-IG-API-KEY": apiKey,
        CST: cst,
        "X-SECURITY-TOKEN": xSecurityToken,
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Failed to confirm order:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to confirm order");
  }
};

const analyzeDataWithGPT = async (data) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a financial trading expert specializing in forex and technical analysis.",
        },
        {
          role: "user",
          // content: `Analyze the following forex market data and provide a buy or sell recommendation. This prompt is part of a trading bot and your answer will directly influence its actions. My GPT max_tokens limit is 50, so keep the response concise, or please respond with either 'buy' or 'sell':\n\n${JSON.stringify(
          //   data,
          //   null,
          //   2
          // )}`,
          content: `Analyze the following forex market data and provide a buy or sell recommendation. This prompt is part of a trading bot and your answer will directly influence its actions. 
          \n\n${JSON.stringify(data, null, 2)}`,
        },
      ],
      model: "gpt-4o",
      // max_tokens: 200,
      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error analyzing data with GPT-4:", error);
    throw new Error("Failed to analyze data with GPT-4");
  }
};

const trade = async (
  epic,
  startDate,
  endDate,
  maxPricePoints,
  pageSize,
  pageNumber
) => {
  try {
    const marketData = await getMarketData(
      epic,
      // "MINUTE_3",
      "MINUTE_15",
      startDate,
      endDate,
      maxPricePoints,
      pageSize,
      pageNumber
    );
    const closes = marketData.map((data) => data.close);
    const fastMA = EMA.calculate({ period: 12, values: closes });
    const slowMA = EMA.calculate({ period: 26, values: closes });
    const rsi = RSI.calculate({ period: 14, values: closes });

    const latestData = {
      marketData: marketData,
      fastMA: fastMA[fastMA.length - 1],
      slowMA: slowMA[slowMA.length - 1],
      rsi: rsi[rsi.length - 1],
    };

    const gptAnalysis = await analyzeDataWithGPT(latestData);
    console.log("GPT Analysis:", gptAnalysis);

    // Example risk/reward ratio
    const riskRewardRatio = 2;

    // Example points for stop loss and take profit
    const stopLossPoints = 10;
    const takeProfitPoints = stopLossPoints * riskRewardRatio;

    // Get the latest close price
    const latestClosePrice = closes[closes.length - 1];

    let direction;

    // if (gptAnalysis.toLowerCase().includes("buy")) {
    //   direction = "BUY";
    // } else if (gptAnalysis.toLowerCase().includes("sell")) {
    //   direction = "SELL";
    // } else {
    //   console.log("No clear trading signal from GPT-4");
    //   return;
    // }

    // // const expiry = "DFB";
    // const expiry = "-";

    // const order = {
    //   epic,
    //   direction,
    //   orderType: "MARKET",
    //   size: 1, // Adjust trade size as needed
    //   guaranteedStop: false,
    //   stopLevel:
    //     direction === "BUY"
    //       ? latestClosePrice - stopLossPoints
    //       : latestClosePrice + stopLossPoints,
    //   stopDistance: null,
    //   trailingStop: null,
    //   trailingStopIncrement: null,
    //   forceOpen: true,
    //   limitLevel:
    //     direction === "BUY"
    //       ? latestClosePrice + takeProfitPoints
    //       : latestClosePrice - takeProfitPoints,
    //   limitDistance: null,
    //   currencyCode: "USD",
    //   expiry,
    //   timeInForce: "FILL_OR_KILL",
    // };

    // const orderResponse = await placeOrder(order);
    // console.log("Order placed:", orderResponse);

    // // Check if the order was successfully placed
    // if (orderResponse && orderResponse.dealReference) {
    //   console.log(
    //     `Trade successfully placed with deal reference: ${orderResponse.dealReference}`
    //   );
    //   const confirmation = await confirmOrder(orderResponse.dealReference);
    //   console.log("Order Confirmation:", confirmation);

    //   if (confirmation.dealStatus !== "ACCEPTED") {
    //     console.error(`Order was not accepted: ${confirmation.reason}`);
    //   }
    // } else {
    //   console.error("Failed to place trade: No deal reference returned.");
    // }
  } catch (error) {
    console.error("Failed to execute trade:", error);
  }
};

// Expose the controller methods
const IgController = {
  getMarketDetails,
  viewMarketData,
  trade,
};

module.exports = IgController;
