module.exports = (req, res) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;
  const userId = req.cookies.user_id;

  if (!accessToken || !refreshToken || !userId) {
    res.status(400).send("Missing one or more values: visit /authorize");
    return;
  }

  res.send(
    `Access token: ${accessToken}<br>Refresh token: ${refreshToken}<br>User ID: ${userId}`
  );
};
