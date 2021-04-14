
import { Router } from 'express';

import authUser from '../middlewares/authUser';

import listCitiesService from '../services/listCitiesService';
import createCityService from '../services/createCityService';
import updateCityService from '../services/updateCityService';
import deleteCityService from '../services/deleteCityService';

const cityRoutes = Router();

// LIST CITIES
cityRoutes.get('/', async (request, response) => {
  try {
    const cities = await listCitiesService();

    return response.status(200).json(cities);
  } catch (error) {
    return response.status(500).json({ error: 'internal server error' });
  }
})

// CREATE A CITY
cityRoutes.post('/', authUser, async (request, response) => {
  try {
    const {
      name,
      prefect,
      population,
      belong_state_id
    } = request.body;

    const state = await createCityService({
      name,
      prefect,
      population,
      belong_state_id
    })

    return response.status(201).json(state);
  } catch (error) {
    console.log(error)
    return response.status(error.status).json({ error: error.message });
  }
})

// UPDATE A CITY
cityRoutes.patch('/:id', authUser, async (request, response) => {
  try {
    const { name, prefect, population } = request.body;
    const cityId = request.params.id;

    const state = await updateCityService({ cityId, name, prefect, population });

    return response.status(200).json(state);
  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
})

// DELETE A CITY
cityRoutes.delete('/:id', authUser, async (request, response) => {
  try {
    const cityId = request.params.id;

    await deleteCityService({ cityId });

    return response.status(200).send();
  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
})

export default cityRoutes;
