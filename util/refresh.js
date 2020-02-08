const axios = require("axios");
const env = require("../env");

module.exports = refreshToken =>
  axios({
    method: "post",
    url: `${env.canvascblApiUri}/api/oauth2/token`,
    params: {
      grant_type: "refresh_token",
      client_id: env.clientId,
      client_secret: env.clientSecret,
      redirect_uri: env.redirectUri,
      refresh_token: refreshToken
    }
  });
