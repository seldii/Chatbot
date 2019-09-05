const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send({ "du schaffst das!": "Ja" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
