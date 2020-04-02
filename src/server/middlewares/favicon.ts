import { Request, Response, NextFunction } from 'express';

export function favicon(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (request.path === '/favicon.ico') {
    response.status(404);
    response.end();
    return;
  }
  next();
}
