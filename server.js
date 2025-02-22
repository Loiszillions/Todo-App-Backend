// Connect MongoDB, set up middleware, and start Express server.
const express = require("express");
const cors = require("cors");  // to enable Cross-Origin Resource Sharing
const bodyParser = require("body-parser");  // to Parse incoming request JSON
const connectDB = require("./config/db");

require("dotenv").config();      // load variables from the .env file Or dotenv.config(); directly

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/users", require("./routes/userRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
    res.send("ToDo App is running...");
});

// Start Server
const PORT = process.env.PORT || 3000 // The port in the . env file  or 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});