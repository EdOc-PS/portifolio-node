const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  github: String,
  live: String,
  featured: Boolean,
});

module.exports = mongoose.model("Project", ProjectSchema);