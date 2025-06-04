// netlify/functions/token.js
const axios = require("axios");
exports.handler = async function(event) {
  const { code } = JSON.parse(event.body);

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.REACT_APP_SPOTIFY_CLIENT_ID + ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
  };
};