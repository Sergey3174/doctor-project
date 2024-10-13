const mongoose = require("mongoose");
const validator = require("validator");

const ApplicationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
