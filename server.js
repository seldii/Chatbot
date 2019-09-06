const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/keys");

app.use(bodyParser.json());

require("./routes/dialogFlowRoutes")(app);

//DB Config
const db = config.mongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true });

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
