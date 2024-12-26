const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const FoodEntry = require("./models/FoodEntry");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// API Endpoints

app.post("/api/food-entry", async (req, res) => {
  try {
    console.log("POST /api/food-entry", req.body);
    const { userId = "defaultUserId", date, food } = req.body;
    const userObjectId = mongoose.Types.ObjectId(userId);
    const entry = await FoodEntry.findOneAndUpdate(
      { userId: userObjectId, date },
      { $push: { food: { $each: food } } },
      { upsert: true, new: true }
    );
    console.log("Entry updated/created:", entry);
    res.status(200).json(entry);
  } catch (error) {
    console.error("Error in POST /api/food-entry:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/food-entry/:date", async (req, res) => {
  try {
    console.log("GET /api/food-entry/:date", req.params, req.query);
    const { userId } = req.query;
    const { date } = req.params;
    const userObjectId = mongoose.Types.ObjectId(userId);
    const entry = await FoodEntry.findOne({
      userId: userObjectId,
      date: new Date(date),
    });
    console.log("Entry found:", entry);
    res.status(200).json(entry || {});
  } catch (error) {
    console.error("Error in GET /api/food-entry/:date:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
