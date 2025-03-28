const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; 
    console.log("🔹 Middleware received token:", token); // Debugging

    if (!token) {
        console.log("❌ No token provided!");
        return res.status(403).json({ message: "Access Denied" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("❌ Token verification failed:", err.message);
            return res.status(401).json({ message: "Invalid Token" });
        }
        console.log("✅ Token verified, user:", decoded);
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
