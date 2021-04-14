import { getRepository } from 'typeorm';
import City from '../models/City';
import State from '../models/State';
import ApiError from '../errors/ApiError';

interface Request {
  name: string;
  prefect: string;
  population: number;
  belong_state_id: string;
}

export default async function createCityService ({
  name,
  prefect,
  population,
  belong_state_id
}: Request): Promise<City> {
  const cityRepository = getRepository(City);
  const stateRepository = getRepository(State);

  const cityExists = await cityRepository.findOne({
    where: { name }
  });

  if( cityExists ) {
    throw new ApiError("city already exists", 400);
  }

  const stateExists = await stateRepository.findOne({
    where: { id: belong_state_id }
  });

  if(!stateExists)
    throw new ApiError("invalid state, instance is not found", 404);

  console.log(
    name,
    prefect,
    population,
    belong_state_id
  );

  const city = cityRepository.create({
    name,
    prefect,
    population,
    state_fk: belong_state_id,
  });

  await cityRepository.save(city);

  return city;
}
