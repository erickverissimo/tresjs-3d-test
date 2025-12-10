import { Request, Response, NextFunction } from 'express';

export default async function logRouter(req: Request, res: Response, next: NextFunction) {
  req['clientIP'] = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;

  next();
}