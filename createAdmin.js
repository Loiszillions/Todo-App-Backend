const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Import User model
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Database connection error:", err));

const createAdmin = async () => {
    try {
        // Check if an admin already exists
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            console.log("Super Admin already exists:", existingAdmin.email);
            mongoose.connection.close();
            return;
        }

        // Hash password
        // const hashedPassword = await bcrypt.hash("jamesAdmin345", 10);  its already hashed pre save in the user schema

        // Create a new admin user (first Admin user, the Super Admin,who can in turn create other Admins)
        const admin = new User({
            username: "JamesAdmin",
            email: "james@gmail.com",
            password: "jamesAdmin345",
            role: "admin"
        });

        await admin.save();
        console.log("Admin user created successfully:", admin.email);
        mongoose.connection.close();
    } catch (error) {
        console.error("Error creating admin:", error);
        mongoose.connection.close();
    }
};

// Run the function
createAdmin();