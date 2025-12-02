import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 4000;

// 1) Transactions per second
app.get("/api/transactions", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json"
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

// 2) Global stats
app.get("/api/stats", async (req, res) => {
  try {
    const response = await fetch("https://api.blockchain.info/stats");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stats" });
  }
});

// 3) Mining pools
app.get("/api/pools", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.blockchain.info/pools?timespan=5days"
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pools" });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
