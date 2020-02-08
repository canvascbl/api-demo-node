const { stringify } = require("qs");
const env = require("../env");

module.exports = (req, res) => {
  const scopes = req.query.scopes;
  if (!scopes) {
    res.status(400).send("no scopes - use ?scopes[]=scope");
    return;
  }

  const finalRedirect = `${env.canvascblApiUri}/api/oauth2/auth?${stringify({
    response_type: "code",
    client_id: env.clientId,
    redirect_uri: env.redirectUri,
    scope: scopes.join(" "),
    purpose: "CanvasCBL API Test from Node.JS"
  })}`;

  if (req.query.redirect && req.query.redirect.toLowerCase() === "false") {
    res.send(finalRedirect);
    return;
  }

  res.redirect(finalRedirect);
};
