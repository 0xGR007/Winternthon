import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { sub: string; role: string };
}

export function authMiddleware(requiredRole?: 'student' | 'teacher') {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'missing authorization header' });

    const token = auth.split(' ')[1];
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
      req.user = { sub: data.sub, role: data.role };
      if (requiredRole && data.role !== requiredRole) return res.status(403).json({ error: 'forbidden' });
      next();
    } catch (err) {
      return res.status(401).json({ error: 'invalid token' });
    }
  };
}
