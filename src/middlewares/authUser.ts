import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/ApiError';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authUser (
  request:Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { authorization } = request.headers;

    if( !authorization ) {
      throw new ApiError("'authorization' header param is missing in request", 400);
    }

    if( !authorization.includes('Bearer') ) {
      throw new ApiError("invalid 'authorization' param", 400);
    }

    const [, token] = authorization.split(' ');

    try {
      const data = jwt.verify(token, config.api_secret);

      const { id } = data as TokenPayload;

      request.accountId = id;

      next();
    } catch {
      throw new ApiError('your token are invalid', 401);
    }

  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
}
