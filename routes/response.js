const axios = require("axios");
const env = require("../env");

module.exports = async (req, res) => {
  if (req.query.error) {
    res.send(`Error from CanvasCBL: ${req.query.error}`);
    return;
  }

  if (!req.query.code) {
    res.status(400).send("missing code as query param");
    return;
  }

  let tokenData;
  try {
    const tokenRequest = await axios({
      method: "post",
      url: `${env.canvascblApiUri}/api/oauth2/token`,
      params: {
        grant_type: "authorization_code",
        client_id: env.clientId,
        client_secret: env.clientSecret,
        redirect_uri: env.redirectUri,
        code: req.query.code
      }
    });

    tokenData = tokenRequest.data;
  } catch (e) {
    if (e.response && e.response.data) {
      res
        .status(500)
        .send(
          `Error performing the /api/oauth2/token request: ${JSON.stringify(
            e.response.data,
            null,
            2
          )}`
        );
      return;
    }
    console.log(e);
    res
      .status(500)
      .send(
        `Error from CanvasCBL performing the /api/oauth2/token request:<br>${JSON.stringify(
          e,
          null,
          2
        )}`
      );
    return;
  }

  // save as cookie
  res.cookie("access_token", tokenData.access_token, {
    secure: false,
    sameSite: "None"
  });
  res.cookie("refresh_token", tokenData.refresh_token, {
    secure: false,
    sameSite: "None"
  });
  res.cookie("user_id", tokenData.user.id, {
    secure: false,
    sameSite: "None"
  });

  // We now have the user's access and refresh tokens.
  // Consider saving them to your database!

  res.send(
    `Successful token grant! Tokens have been saved as cookies so you can use /grades, but the response is below:<br>${JSON.stringify(
      tokenData,
      null,
      2
    )}`
  );
};
