import { Router } from 'express';

import authUser from '../middlewares/authUser';

import listStatesService from '../services/listStatesService';
import createStateService from '../services/createStateService';
import updateStateService from '../services/updateStateService';
import deleteStateService from '../services/deleteStateService';

const stateRoutes = Router();

// LIST STATES
stateRoutes.get('/', async (request, response) => {
  try {
    const states = await listStatesService();

    return response.status(200).json(states);
  } catch (error) {
    return response.status(500).json({ error: 'internal server error' });
  }
})

// CREATE A STATE
stateRoutes.post('/', authUser, async (request, response) => {
  try {
    const {
      name
    } = request.body;

    const state = await createStateService({
      name
    })

    return response.status(201).json(state);
  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
})

// UPDATE A STATE
stateRoutes.patch('/:id', authUser, async (request, response) => {
  try {
    const { name } = request.body;
    const stateId = request.params.id;

    const state = await updateStateService({ stateId, name });

    return response.status(200).json(state);
  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
})

// DELETE A STATE
stateRoutes.delete('/:id', authUser, async (request, response) => {
  try {
    const stateId = request.params.id;

    await deleteStateService({ stateId });

    return response.status(200).send();
  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
})

export default stateRoutes;
