const express = require("express");
const router = express.Router();

//Session Model
const Session = require("../models/session");
module.exports = app => {
  //Save Session
  app.get("/api/:session_id/messages", async (req, res) => {
    try {
      const messages = await Session.find({
        session_id: req.params.session_id
      });

      res.send(messages);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  });
};
