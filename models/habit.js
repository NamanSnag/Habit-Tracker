const mongoose = require("mongoose");
const Schema = mongoose.Schema

const habitSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    tracking: [
      {
        date: {
          type: String,
          required: true
        },
        status: {
          type: String,
          default: "none"
        }
      }
    ]
  });
  
  const habit = mongoose.model("Habit", habitSchema);

  module.exports = habit;