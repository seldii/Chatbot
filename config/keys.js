// Heroku adds an environment variable by default
// check for the env variable and load the according config file
// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === "production") {
  // return the prod set of keys
  module.exports = require("./prod");
} else {
  // return the dev keys
  module.exports = require("./dev");
}
