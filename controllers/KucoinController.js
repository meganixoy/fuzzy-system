require("dotenv").config();
const axios = require("axios");
const crypto = require("crypto");
const { RSI, MACD, BollingerBands } = require("technicalindicators");
const { OpenAI } = require("openai");

const KucoinController = {};
const baseUrl = "https://api-futures.kucoin.com";
const GPT_API_KEY = process.env.GPT_API_KEY;

const openai = new OpenAI({
  apiKey: GPT_API_KEY,
  organization: process.env.GPT_ORGANIZATION,
  project: process.env.GPT_PROJECT_ID,
});

const createSignature = (apiSecret, strForSign) => {
  return crypto
    .createHmac("sha256", apiSecret)
    .update(strForSign)
    .digest("base64");
};

const createHeaders = (apiKey, apiSecret, apiPassphrase, endpoint) => {
  const timestamp = Date.now().toString();
  const strForSign = timestamp + "GET" + endpoint;
  const signature = createSignature(apiSecret, strForSign);
  const passphrase = createSignature(apiSecret, apiPassphrase);

  return {
    "KC-API-KEY": apiKey,
    "KC-API-SIGN": signature,
    "KC-API-TIMESTAMP": timestamp,
    "KC-API-PASSPHRASE": passphrase,
    "KC-API-KEY-VERSION": "2",
  };
};

KucoinController.getKlines = async (req, res) => {
  const apiKey = process.env.KUCOIN_API_KEY;
  const apiSecret = process.env.KUCOIN_API_SECRET;
  const apiPassphrase = process.env.KUCOIN_API_PASSPHRASE;
  const symbol = req.params.symbol || "XBTUSDTM";
  const granularity = 5; // 5-minute interval

  // Calculate the start time for 48 5-minute ticks ago (4 hours)
  const now = Date.now();
  const startTime = now - 48 * 5 * 60 * 1000; // 48 ticks * 5 minutes * 60 seconds * 1000 milliseconds

  const from = startTime;
  const to = now;

  const endpoint = `/api/v1/kline/query?symbol=${symbol}&granularity=${granularity}&from=${from}&to=${to}`;
  const url = baseUrl + endpoint;
  const headers = createHeaders(apiKey, apiSecret, apiPassphrase, endpoint);

  try {
    const response = await axios.get(url, { headers });
    if (response.data) {
      const data = response.data.data;
      const indicators = calculateIndicators(data);

      // Generate recommendations using GPT-4
      const recommendations = await generateRecommendations(
        indicators,
        data[data.length - 1][2]
      );

      return res.status(200).json({ indicators, recommendations });
    } else {
      return res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    console.error("Error fetching Kline data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const calculateIndicators = (data) => {
  const closes = data.map((candle) => candle[2]);

  const rsi = RSI.calculate({ period: 14, values: closes });

  const macd = MACD.calculate({
    values: closes,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  });

  const bollingerBands = BollingerBands.calculate({
    period: 20,
    values: closes,
    stdDev: 2,
  });

  return { rsi, macd, bollingerBands };
};

const generateRecommendations = async (indicators, currentPrice) => {
  const leverage = 50;
  const targetProfitPercent = 0.2; // 20% PNL
  const stopLossPercent = 0.05; // 5% PNL

  // const takeProfitPrice = currentPrice * (1 + targetProfitPercent / leverage);
  const stopLossPrice = currentPrice * (1 - stopLossPercent / leverage);

  const prompt = `
    Given the following cryptocurrency trading data and technical indicators, provide a clear and concise recommendation to buy or sell, considering that the trading is done with ${leverage}x leverage. Include suggested take profit and stop loss levels, with the understanding that high leverage increases risk significantly. If the recommendation is to sell, the take profit should be lower than the entry price and the stop loss should be higher than the entry price. For a buy recommendation, the take profit should be higher than the entry price and the stop loss should be lower than the entry price.

    Indicators:
    - RSI: ${JSON.stringify(indicators.rsi)}
    - MACD: ${JSON.stringify(indicators.macd)}
    - Bollinger Bands: ${JSON.stringify(indicators.bollingerBands)}

    Current Price: ${currentPrice}
    Leverage: ${leverage}
    Stop Loss Price: ${stopLossPrice}

    Please analyze the provided data and indicators to give a well-reasoned trading recommendation that takes into account the leverage.
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert cryptocurrency trading advisor specializing in technical analysis and high-leverage trading strategies.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o",
      temperature: 0.7,
    });

    console.log(completion.choices[0].message.content.trim());
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return "Error generating recommendations.";
  }
};

module.exports = KucoinController;
