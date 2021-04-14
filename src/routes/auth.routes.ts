import { Router } from 'express';
import ApiError from '../errors/ApiError';
import authUserService from '../services/authUserService'

const authRoutes = Router();

// AUTH ACCOUNT
authRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    if(!email || !password) {
      throw new ApiError('missing param in request', 400);
    }

    const { user, token } = await authUserService({ email, password });

    return response.status(200).json({ user, token });

  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
});

export default authRoutes;
