const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/proxy", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.bein.com/"
      }
    });

    const contentType = response.headers.get("content-type");

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", contentType);

    response.body.pipe(res);

  } catch (err) {
    res.status(500).send("Proxy error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
