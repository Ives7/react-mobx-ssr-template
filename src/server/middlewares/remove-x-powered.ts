import { NextFunction, Request, Response } from 'express';

export function removeXPowered(
  _: Request,
  response: Response,
  next: NextFunction,
): void {
  response.set('X-Powered-By', 'Ives7');
  next();
}
