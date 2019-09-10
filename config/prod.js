module.exports = {
  googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  googlePrivateKey: JSON.parse(process.env.GOOGLE_PRIVATE_KEY),
  googleProjectID: process.env.GOOGLE_PROJECT_ID,
  mongoURI: process.env.MONGO_URI
};
