import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const tokenVerified = jwt.verify(token, process.env.TOKEN_SECRET || '');
    req.body = { ...req.body, token: tokenVerified };
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
}
