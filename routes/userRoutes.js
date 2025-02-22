const express = require("express");
const jwt = require("jsonwebtoken");  // to Generate authentication tokens
const bcrypt = require("bcryptjs");  // to Hash user passwords securely
const auth = require("../middleware/auth");
const User = require("../models/User"); // Mongoose User model
require("dotenv").config();

const router = express.Router();

// User Registration   (POST http://localhost:3000/users/register)
router.post("/register", async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if username already exists
        const userName = await User.findOne({ username });
        if (userName) return res.status(400).json({ message: "This Username is not available" });

        // Check if user already exists by email
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(404).json({ message: "User already exists" });

        // Create new user
        // Only allow "admin" role if an admin is creating the user
        const newUser = new User({ username, email, password, role: role === "admin" ? "admin" : "user" }); //to Prevent Users from Signing up as Admin 
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error("registration Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// User Login  (POST http://localhost:3000/users/login)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        //find the user by his email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);       //user is from found user by email hence user.password
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
