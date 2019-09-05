"use strict";

const chatbot = require("../chatbot/chatbot");

module.exports = app => {
  app.post("/api/df_text_query", async (req, res) => {
    try {
      const responses = await chatbot.textQuery(
        req.body.text,
        req.body.parameters
      );
      res.send(responses[0].queryResult);
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/api/df_event_query", async (req, res) => {
    try {
      const responses = await chatbot.eventQuery(
        req.body.event,
        req.body.parameters
      );
      res.send(responses[0].queryResult);
    } catch (err) {
      console.log(err);
    }
  });
};
