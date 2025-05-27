import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // 👈 use correct header key

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token is not valid!" });
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ message: "You are not authenticated!" });
    }
};

export default verifyToken;
