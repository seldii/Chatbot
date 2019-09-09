"use strict";

const chatbot = require("../chatbot/chatbot");

module.exports = app => {
  app.post("/api/text_query", async (req, res) => {
    try {
      const responses = await chatbot.textQuery(
        req.body.text,
        req.body.identifier,
        req.body.messageIdentifier,
        red.body.languageCode,
        req.body.parameters
      );
      res.send(responses[0].queryResult);
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/api/event_query", async (req, res) => {
    try {
      const responses = await chatbot.eventQuery(
        req.body.event,
        req.body.identifier,
        req.body.parameters,
        req.body.languageCode
      );
      res.send(responses[0].queryResult);
    } catch (err) {
      console.log(err);
    }
  });
};
