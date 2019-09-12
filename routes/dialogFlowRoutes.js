"use strict";

const chatbot = require("../chatbot/chatbot");
const DetectLanguage = require("detectlanguage");

const detectLanguage = new DetectLanguage({
  key: "11e3c4ee547466256cb64048503dee95",
  ssl: true || false
});

module.exports = app => {
  app.post("/api/text_query", async (req, res) => {
    try {
      detectLanguage.detect(req.body.text, async function callback(
        error,
        result
      ) {
        if (error) throw error;
        let langCode = result[0].language;

        const responses = await chatbot.textQuery(
          req.body.text,
          req.body.identifier,
          req.body.messageIdentifier,
          langCode,
          req.body.parameters
        );
        res.send(responses[0].queryResult);
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/api/event_query", async (req, res) => {
    try {
      const responses = await chatbot.eventQuery(
        req.body.event,
        req.body.identifier,
        req.body.messageIdentifier,
        req.body.languageCode,
        req.body.parameters
      );
      res.send(responses[0].queryResult);
    } catch (err) {
      console.log(err);
    }
  });
};
