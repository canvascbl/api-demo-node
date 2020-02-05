const env = {};

function getEnvOrPanic(envName, friendlyName) {
  const e = process.env[envName];
  if (!e) {
    console.error(
      `Unable to find environment variable ${friendlyName} (${envName})!`
    );
    process.exit(2);
  }

  env[friendlyName] = e;
}

function getEnv(envName, friendlyName, defaultValue) {
  const e = process.env[envName];
  if (!e) {
    env[friendlyName] = defaultValue;
    return;
  }

  env[friendlyName] = e;
}

getEnvOrPanic("CLIENT_ID", "clientId");
getEnvOrPanic("CLIENT_SECRET", "clientSecret");
getEnvOrPanic("REDIRECT_URI", "redirectUri");

getEnv("CANVASCBL_API_URI", "canvascblApiUri", "https://api.canvascbl.com");

module.exports = env;
