const axios = require("axios");
const env = require("../env");
const refresh = require("../util/refresh");

module.exports = async (req, res) => {
  let accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!accessToken || !refreshToken) {
    res.status(400).send("Missing access/refresh token; visit /authorize");
    return;
  }

  let gradesData;
  let gradesError;

  // define a function to get grades
  // this way we don't have to code this twice
  async function getGrades(token) {
    try {
      const gradesResp = await axios({
        method: "get",
        url: `${env.canvascblApiUri}/api/v1/grades`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      gradesData = gradesResp.data;
    } catch (e) {
      gradesError = e;
    }
  }

  // get the grades
  await getGrades(accessToken);

  // if it worked return
  if (gradesData) {
    res.json(gradesData);
    return;
  }

  // if it was an expired token, refresh
  if (
    gradesError &&
    gradesError.response &&
    gradesError.response.data &&
    gradesError.response.data.error === "invalid access token"
  ) {
    // need to refresh token
    try {
      const refreshResp = await refresh(refreshToken);

      accessToken = refreshResp.data.access_token;
      gradesError = null;
    } catch (e) {
      res.status(500).send(`Error refreshing token:<br>${JSON.stringify(e)}`);
      return;
    }

    // get grades and respond on success
    await getGrades(accessToken);
    if (gradesData) {
      // save the new token
      // consider saving to your database
      res.cookie("access_token", accessToken, {
        secure: false,
        sameSite: "None"
      });
      res.json(gradesData);
      return;
    }
  } else if (gradesError) {
    // if it's an unrelated error
    // log it and say so
    console.log(gradesError);
    res
      .status(500)
      .send(`Error getting grades:<br>${JSON.stringify(gradesError)}`);
    return;
  }

  // check for error after refreshing token
  if (gradesError) {
    res
      .status(500)
      .send(
        `Error getting grades after refreshing token:<br>${JSON.stringify(
          gradesError
        )}`
      );
    return;
  }

  // Literally unknown error.
  res.status(500).send("Unknown error getting grades.");
};
