import { NestMiddleware, Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // TODO: Implement Authorization for Admin, Doctor, and User
    next();
  }
}
