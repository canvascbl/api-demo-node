const axios = require("axios");
const env = require("../env");
const refresh = require("../util/refresh");

module.exports = async (req, res) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  res.clearCookie("access_token", { secure: false, sameSite: "None" });
  res.clearCookie("refresh_token", { secure: false, sameSite: "None" });
  res.clearCookie("user_id", { secure: false, sameSite: "None" });

  // this way we don't need to write the code twice
  function voidGrant(access) {
    return axios({
      method: "delete",
      url: `${env.canvascblApiUri}/api/oauth2/token`,
      headers: {
        Authorization: `Bearer ${access}`
      }
    });
  }

  if (accessToken && refreshToken) {
    // we want to remove the token set
    try {
      await voidGrant(accessToken);
      // went ok
      res.send("Successfully cleared cookies and voided the grant.");
      return;
    } catch (e) {}

    // we need to refresh, then clear
    let newAccess;
    try {
      const refreshReq = await refresh(refreshToken);
      newAccess = refreshReq.data.access_token;
    } catch (e) {
      res.send(
        "Successfully cleared cookies but couldn't refresh access token to void grant."
      );
      return;
    }

    // now we can try to void again
    try {
      await voidGrant(newAccess);
    } catch (e) {
      res.send(
        "Successfully cleared cookies and refreshed token but couldn't void the grant."
      );
      return;
    }
  }

  res.send("Successfully cleared cookies and voided grant.");
};
