const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Bug = require("./bugModel"); // Import the Bug model

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/bugtracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
    res.send("Bug Tracker API is Running!");
});

// Save a new bug to MongoDB
app.post("/bugs", async (req, res) => {
    try {
        const bug = new Bug(req.body);
        await bug.save();
        res.status(201).json(bug);
    } catch (error) {
        res.status(500).json({ message: "Failed to save bug" });
    }
});

// Get all bugs from MongoDB
app.get("/bugs", async (req, res) => {
    try {
        const bugs = await Bug.find();
        res.json(bugs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch bugs" });
    }
});

// Delete a bug by ID
app.delete("/bugs/:id", async (req, res) => {
    try {
        const deletedBug = await Bug.findByIdAndDelete(req.params.id);
        if (!deletedBug) {
            return res.status(404).json({ message: "Bug not found" });
        }
        res.json({ message: "Bug deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete bug" });
    }
});

// Update a bug by ID
app.put("/bugs/:id", async (req, res) => {
    try {
        const updatedBug = await Bug.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedBug) {
            return res.status(404).json({ message: "Bug not found" });
        }
        res.json(updatedBug);
    } catch (error) {
        res.status(500).json({ error: "Failed to update bug" });
    }
});

// Toggle bug status (Open/Closed)
app.patch("/bugs/:id/status", async (req, res) => {
    try {
        const bug = await Bug.findById(req.params.id);
        if (!bug) return res.status(404).json({ message: "Bug not found" });

        bug.status = bug.status === "open" ? "closed" : "open";
        await bug.save();
        res.json({ message: `Bug marked as ${bug.status}!` });
    } catch (error) {
        res.status(500).json({ error: "Failed to update bug status" });
    }
});

app.listen(8080, () => console.log("🚀 Server running on http://localhost:8080"));
