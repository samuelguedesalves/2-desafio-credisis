import bcrypt from 'bcrypt';
import jwt, { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../models/User';
import config from '../config';
import ApiError from '../errors/ApiError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Omit<User, 'password'>;
  token: string;
}

export default async function createAccountService ({
  email,
  password,
}: Request): Promise<Response> {
  const userRepository = getRepository(User);

  const verifyExistsUser = await userRepository.findOne({ where: { email } });

  if( verifyExistsUser ) {
    throw new ApiError("this user already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = userRepository.create({
    email,
    password: hashedPassword,
  });

  await userRepository.save(user);

  const token = jwt.sign({ id: user.id }, config.api_secret, { expiresIn: '24h' } );

  const { password: pass, ...userWithoutPass } = user;

  return {
    user: userWithoutPass,
    token
  };
}
