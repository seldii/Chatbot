const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
  message: {
    identifier: { type: String },
    detected_language: { type: String },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
});

// Create a model
const Session = mongoose.model("user", sessionSchema);
// Export the model
module.exports = Session;
