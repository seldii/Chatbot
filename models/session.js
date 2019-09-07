const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
  session_id: { type: String },
  replies: { type: Object },
  message: {
    identifier: {
      type: String
    },
    detected_language: { type: String },
    timestamp: { type: Date, default: Date.now }
  },
  timestamp: { type: Date, default: Date.now }
});

// Create a model
const Session = mongoose.model("session", sessionSchema);
// Export the model
module.exports = Session;
