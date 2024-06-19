const KucoinFutures = require("kucoin-futures-node-sdk").default;
require("dotenv").config();
const { EMA, RSI } = require("technicalindicators");
const { OpenAI } = require("openai");

const apiKey = process.env.KUCOIN_API_KEY;
const apiSecret = process.env.KUCOIN_API_SECRET;
const apiPassphrase = process.env.KUCOIN_API_PASSPHRASE;
const GPT_API_KEY = process.env.GPT_API_KEY;

const openai = new OpenAI({
  apiKey: GPT_API_KEY,
  organization: process.env.GPT_ORGANIZATION,
  project: process.env.GPT_PROJECT_ID,
});

const kucoinClient = new KucoinFutures({
  key: apiKey,
  secret: apiSecret,
  passphrase: apiPassphrase,
  axiosProps: {
    env: "prod",
    version: "2",
  },
});

const getMarketDetails = async (req, res) => {
  const { symbol } = req.params;

  try {
    const response = await kucoinClient.futuresTicker(symbol);
    res.status(200).json(response);
  } catch (error) {
    console.error("Failed to get market details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMarketData = async (symbol, resolution = "1min", startAt, endAt) => {
  try {
    const response = await kucoinClient.futuresKline({
      symbol,
      granularity: resolution,
      from: startAt,
      to: endAt,
    });

    console.log(response);

    // return response.map((candle) => ({
    //   time: new Date(candle[0] * 1000),
    //   open: parseFloat(candle[1]),
    //   close: parseFloat(candle[2]),
    //   high: parseFloat(candle[3]),
    //   low: parseFloat(candle[4]),
    //   volume: parseFloat(candle[5]),
    // }));
  } catch (error) {
    // console.error("Error fetching market data:", error.message);
    // throw new Error("Failed to fetch market data");
  }
};

const viewMarketData = async (req, res) => {
  const { symbol, resolution, startAt, endAt } = req.query;

  if (!symbol) {
    return res.status(400).json({ error: "symbol parameter is required" });
  }

  try {
    const marketData = await getMarketData(symbol, resolution, startAt, endAt);
    res.status(200).json(marketData);
  } catch (error) {
    console.error("Failed to fetch market data:", error);
    res.status(500).json({ error: "Failed to fetch market data" });
  }
};

const analyzeDataWithGPT = async (data) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a financial trading expert specializing in cryptocurrency and technical analysis.",
        },
        {
          role: "user",
          content: `Analyze the following crypto market data and provide a buy or sell recommendation. This prompt is part of a trading bot and your answer will directly influence its actions. \n\n${JSON.stringify(
            data,
            null,
            2
          )}`,
        },
      ],
      model: "gpt-4o",
      max_tokens: 200,
      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error analyzing data with GPT-4:", error);
    throw new Error("Failed to analyze data with GPT-4");
  }
};

const trade = async (symbol, startAt, endAt) => {
  try {
    // const marketData = await getMarketData(symbol, "1min", startAt, endAt);

    console.log(kucoinClient);

    //   const closes = marketData.map((data) => data.close);
    //   const fastMA = EMA.calculate({ period: 12, values: closes });
    //   const slowMA = EMA.calculate({ period: 26, values: closes });
    //   const rsi = RSI.calculate({ period: 14, values: closes });

    //   const latestData = {
    //     marketData: marketData,
    //     fastMA: fastMA[fastMA.length - 1],
    //     slowMA: slowMA[slowMA.length - 1],
    //     rsi: rsi[rsi.length - 1],
    //   };

    //   const gptAnalysis = await analyzeDataWithGPT(latestData);
    //   console.log("GPT Analysis:", gptAnalysis);

    //   // Log insights without placing orders
    //   console.log({
    //     symbol,
    //     gptAnalysis,
    //     latestData,
    //   });
  } catch (error) {
    console.error("Failed to execute trade:", error);
  }
};

// Expose the controller methods
const KucoinController = {
  getMarketDetails,
  viewMarketData,
  trade,
};

module.exports = KucoinController;
