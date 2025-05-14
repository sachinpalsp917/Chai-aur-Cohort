import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    console.log(req.cookies);
    let token = req.cookies?.token;
    console.log("Token Found: ", token ? "YES" : "NO");

    if (!token) {
      return res.status(401).json({
        success: true,
        message: "Authentication failed",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded data:", decoded);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("middleware failure");
    return res.status(500).json({
      success: false,
      message: "Middleware auth failed",
    });
  }
};
