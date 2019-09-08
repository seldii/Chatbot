const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
  session_id: { type: String },
  replies: {
    msg: { type: Array },
    locale_key: { type: String },
    reply_to: { type: String },
    sent_at: { type: Date, default: Date.now() }
  },
  message: {
    identifier: {
      type: String
    },
    detected_language: { type: String },
    timestamp: { type: Date, default: Date.now() }
  }
});

// Create a model
const Session = mongoose.model("session", sessionSchema);
// Export the model
module.exports = Session;
