import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // ✅ Expect token in Authorization header as: "Bearer <token>"
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decode.userId; // ✅ Attach userId to request
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false,
        });
    }
};

export default isAuthenticated;
