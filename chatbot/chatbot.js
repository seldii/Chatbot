"use strict";
const dialogflow = require("dialogflow");
const structjson = require("structjson");
const config = require("../config/keys");

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};

const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });

const DetectLanguage = require("detectlanguage");

const detectLanguage = new DetectLanguage({
  key: "11e3c4ee547466256cb64048503dee95",
  ssl: true || false
});

module.exports = {
  textQuery: async function(text, identifier, parameters = {}) {
    let sessionPath = sessionClient.sessionPath(
      projectId,
      sessionId + identifier
    );

    detectLanguage.detect(text, function(error, result) {
      let res = JSON.stringify(result);
      console.log(res.language);
    });

    let self = module.exports;

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: languageCode
        }
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  eventQuery: async function(event, identifier, parameters = {}) {
    let sessionPath = sessionClient.sessionPath(
      projectId,
      sessionId + identifier
    );
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters), //Dialogflow's v2 API uses gRPC.
          // a jsonToStructProto method to convert the  JS object to a proto struct.
          languageCode: languageCode
        }
      }
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  handleAction: function(responses) {
    return responses;
  }
};
