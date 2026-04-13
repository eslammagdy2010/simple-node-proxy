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
        "User-Agent": "VLC/3.0.18 LibVLC/3.0.18",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Referer": "http://mvo25.in/",
        "Origin": "http://mvo25.in"
      }
    });

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", response.headers.get("content-type"));

    response.body.pipe(res);

  } catch (err) {

    console.log(err);
    res.status(500).send("Stream relay error");

  }

});

app.listen(process.env.PORT || 3000);
