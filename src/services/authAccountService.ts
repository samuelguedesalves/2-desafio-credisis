import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../models/User';
import ApiError from '../errors/ApiError';
import config from '../config'

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Omit<User, 'password'>;
  token: string;
}

export default async function generateTokenService ({ email, password }: Request): Promise<Response> {
  const userRepository = getRepository(User);

  const userExists = await userRepository.findOne({ where: { email } });

  if( !userExists ) {
    throw new ApiError('User are not found', 404);
  }

  const comparePass = await bcrypt.compare(password, userExists.password);

  if( comparePass ) {
    const token = await jwt.sign({ id: userExists.id },
      config.api_secret,
      { expiresIn: '24h' });

    const  { password: ps, ...userWithoutPassword } = userExists;

    return {
      user: userWithoutPassword,
      token,
    }

  } else {
    throw new ApiError("incorrect password", 401);
  }
}
