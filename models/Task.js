// Links search history to a user (userId).
// Store searched city name.
//  searchDate automatically records when the search was made.
const mongoose = require("mongoose"); // MongoDB ORM for defining schemas

const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: {type: String},
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
}); 

module.exports = mongoose.model("Task", TaskSchema);

// The UserId is to save the generated .id or_id as the case may be