const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// Get all users (Admin only) - GET http://localhost:3000/admin/users
router.get("/users", auth, adminAuth, async (req, res) => {
    try {
        const users = await User.find().select("-password");  //.select("-password") to exlude showing hashed password(security reasons) but await User.find().select("username email role") to include username email role
        let totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers, users});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete a user (Admin only) - DELETE http://localhost:3000/admin/users/:id
router.delete("/users/:id", auth, adminAuth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;