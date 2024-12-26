const mongoose = require("mongoose");

const FoodEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  date: { type: Date, required: true },
  food: [
    {
      name: { type: String, required: true },
      calories: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("FoodEntry", FoodEntrySchema);
