import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseAdmin";
import bcrypt from "bcryptjs";

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

const firebaseAuthMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      throw new Error("Firebase Auth Error: No token provided");
    }

    const tokenWithoutPrefix = token.replace("Bearer ", "");
    const decodedToken = await admin.auth().verifyIdToken(tokenWithoutPrefix); 
    req.user = { uid: decodedToken.uid };
    next();
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default firebaseAuthMiddleware;
