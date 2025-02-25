const mongoose = require("mongoose");

// Define Bug Schema
const bugSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: { type: Date, default: Date.now },
    status: { type: String, default: "open" } // Open or Closed
});

// Create and export Bug model
const Bug = mongoose.model("Bug", bugSchema);
module.exports = Bug;
