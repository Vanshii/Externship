const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
});

const Assignment = mongoose.model("Assignment", AssignmentSchema);

module.exports = Assignment; // ✅ Ensure the export is correct
