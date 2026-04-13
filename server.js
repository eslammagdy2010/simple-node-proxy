const express = require("express");
const fetch = require("node-fetch");

const app = express();

const API =
"https://eslam-magdy-api.hmimo3000.workers.dev/channel.php?id=";

app.get("/proxy", async (req, res) => {

  const id = req.query.id;

  if (!id) {
    return res.send("Missing channel id");
  }

  try {

    const apiResponse = await fetch(API + id);
    const streamUrl = await apiResponse.text();

    const stream = await fetch(streamUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Referer: "https://connect.bein.com/"
      }
    });

    res.set("Access-Control-Allow-Origin", "*");
    stream.body.pipe(res);

  } catch (err) {

    res.send("Stream error");

  }

});

app.listen(process.env.PORT || 3000);
