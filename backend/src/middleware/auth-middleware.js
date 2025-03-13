import { prismaClient } from "../application/database.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    await prismaClient.user.findFirstOrThrow({
      where: {
        token: token,
      },
    });

    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token sudah expired" });
    } else {
      return res.status(401).json({ message: "Token tidak valid" });
    }
  }
};

export default authMiddleware;
