const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ "du schaffst das!": "Ja, genau" });
});

require("./routes/dialogFlowRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
