import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => { // Add 'next' as a parameter here
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        };

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        };

        req.id = decoded.userId;
        next(); // Call next() to pass control to the next middleware

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export default isAuthenticated;
