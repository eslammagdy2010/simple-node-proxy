const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/proxy", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("Missing URL");
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "*/*",
        "Connection": "keep-alive"
      }
    });

    const contentType = response.headers.get("content-type");

    res.set("Access-Control-Allow-Origin", "*");

    if (contentType.includes("application/json")) {
      const json = await response.json();
      return res.json(json);
    }

    response.body.pipe(res);

  } catch (err) {
    res.status(500).send("Proxy error");
  }
});

app.listen(process.env.PORT || 3000);
