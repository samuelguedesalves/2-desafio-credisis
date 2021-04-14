import { Router } from 'express';

import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import stateRoutes from './state.routes';
import cityRoutes from './city.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/state', stateRoutes);
routes.use('/city', cityRoutes);

export default routes;
