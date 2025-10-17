// server.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import http from "http";
import https from "https";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  })
);

const httpAgent = new http.Agent({ keepAlive: true, family: 4 });
const httpsAgent = new https.Agent({
  keepAlive: true,
  family: 4,
  servername: "api.sandbox.pawapay.io",
});

const callbackBase = (process.env.CALLBACK_URL || "").replace(/\/+$/, "") || "http://localhost:5000";

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    env: {
      PAWAPAY_BASE_URL: process.env.PAWAPAY_BASE_URL || null,
      CALLBACK_URL: callbackBase,
      hasApiKey: Boolean(process.env.PAWAPAY_API_KEY),
    },
  });
});

app.get("/diag/ping-pawapay", async (req, res) => {
  try {
    const r = await axios.get(`${process.env.PAWAPAY_BASE_URL}/v2/active-conf`, {
      headers: { Authorization: `Bearer ${process.env.PAWAPAY_API_KEY}` },
      validateStatus: () => true,
      timeout: 10000,
      proxy: false,
      httpAgent,
      httpsAgent,
    });
    res.status(200).json({ reachable: true, status: r.status });
  } catch (e) {
    res.status(500).json({ reachable: false, error: e?.message || "error" });
  }
});

app.post("/api/pay", async (req, res) => {
  const { phoneNumber, amount, provider, successfulUrl, failedUrl } = req.body;

  if (!phoneNumber || !amount || !provider) {
    return res.status(400).json({ error: "phoneNumber, amount, provider requis" });
  }

  // ⚙️ Payload SANS callbackUrl (il doit être configuré dans le dashboard pawaPay)
  const payload = {
    depositId: uuidv4(),
    amount: String(amount),
    currency: "XAF",
    payer: {
      type: "MMO",
      accountDetails: { phoneNumber, provider },
    },
  };

  // Optionnel: si tu gères un fournisseur à redirection (ex. Wave), pawaPay attend successfulUrl/failedUrl
  if (successfulUrl && failedUrl) {
    payload.successfulUrl = successfulUrl;
    payload.failedUrl = failedUrl;
  }

  try {
    console.log("➡️  Envoi à pawaPay:", {
      url: `${process.env.PAWAPAY_BASE_URL}/v2/deposits`,
      hasApiKey: Boolean(process.env.PAWAPAY_API_KEY),
      payload,
    });

    const response = await axios.post(
      `${process.env.PAWAPAY_BASE_URL}/v2/deposits`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAWAPAY_API_KEY}`,
          "Content-Type": "application/json",
          "User-Agent": "premium-app-backend/1.0",
        },
        timeout: 30000,
        validateStatus: () => true,
        proxy: false,
        httpAgent,
        httpsAgent,
      }
    );

    console.log("⬅️  pawaPay status:", response.status);
    console.log("⬅️  pawaPay data:", response.data);

    if (response.status >= 200 && response.status < 300) {
      return res.status(response.status).json(response.data);
    }
    return res
      .status(response.status || 500)
      .json(response.data || { error: "Erreur inconnue pawaPay" });
  } catch (err) {
    if (err.response) {
      console.error("❌ err.response.status:", err.response.status);
      console.error("❌ err.response.data:", err.response.data);
      return res
        .status(err.response.status)
        .json(err.response.data || { error: "Erreur API pawaPay" });
    } else if (err.request) {
      console.error("❌ Aucune réponse pawaPay (timeout/réseau)", {
        method: err.config?.method,
        url: err.config?.url,
        timeout: err.config?.timeout,
      });
      return res.status(500).json({ error: "Pas de réponse de pawaPay" });
    } else {
      console.error("❌ Erreur interne axios:", err.message);
      return res.status(500).json({ error: err.message });
    }
  }
});

app.post("/api/callback", (req, res) => {
  console.log("📥 Callback reçu:", req.body);
  res.status(200).json({ received: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend prêt sur http://localhost:${PORT}`));
