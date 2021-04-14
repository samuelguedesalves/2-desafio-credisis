import { Router } from 'express';

import userRoutes from './user.routes';
import authRoutes from './auth.routes';
// import operationRoutes from './operation.routes';

// import authAccess from '../middlewares/authAccess'

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);

// routes.use('/operation', authAccess, operationRoutes);

export default routes;
