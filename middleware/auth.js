// Middleware to verify JWT tokens
// Verifies JWT tokens from the request header
// Attach the user to req.user for further use (there's a user signed by id after given token when he signup o login)

const jwt = require("jsonwebtoken");  // to only verify authentication tokens
require("dotenv").config();

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after 'Bearer' OR shortcut: const token = req.header("Authorization")?.split(" ")[1]; no need for top part

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user to request  or Ensure `req.user` exists and contains `id`
        next();  // Move to next middleware/controller
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = auth;