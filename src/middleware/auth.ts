import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export interface AuthRequest extends Request {
  authenticated?: boolean;
}

export const authenticateApiKey = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['authorization'];
  
  if (!apiKey) {
    res.status(401).json({ error: 'Missing API key in Authorization header' });
    return;
  }
  
  if (apiKey !== process.env.API_KEY) {
    res.status(401).json({ error: 'Invalid API key' });
    return;
  }
  
  req.authenticated = true;
  next();
};