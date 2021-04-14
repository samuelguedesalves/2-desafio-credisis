import { Router } from 'express';
import ApiError from '../errors/ApiError';

import createUserService from '../services/createUserService';

const userRoutes = Router();

// CREATE A ACCOUNT
userRoutes.post('/', async (request, response) => {
  try {
    const {
      email,
      password
    } = request.body;

    if( !email || !password ) {
      throw new ApiError('any param are invalid', 400);
    }

    const { user, token } = await createUserService({
      email, password
    });

    return response.status(201).json({ user, token });
  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
});

export default userRoutes;
