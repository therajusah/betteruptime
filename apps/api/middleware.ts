import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not set in environment variables.");
    }
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }
    try {
        const token = header.split(" ")[1];
        const data = jwt.verify(token, process.env.JWT_SECRET); 
        req.userId = (data as any).sub as string;
        next();
    } catch (e) {
        return res.status(403).send("");
    }
}
