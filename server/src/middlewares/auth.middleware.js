import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const protectRoute = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      User.findById(user?.id)
        .select("-password")
        .then((data) => {
          req.user = data;
        });
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    next();
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }
};

export default protectRoute;
