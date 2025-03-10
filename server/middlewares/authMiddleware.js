const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; 
    if (!token) return res.status(403).json({ message: "Access Denied" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid Token" });
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
