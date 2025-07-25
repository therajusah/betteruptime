import type { NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    try {
        const token = header?.split(" ")[1];
        let data = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = (data as any).sub as string;
        next();
    } catch(e) {
        res.status(403).send("");
    }
}