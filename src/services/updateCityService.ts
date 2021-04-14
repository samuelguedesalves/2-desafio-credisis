import { getRepository } from 'typeorm';
import City from '../models/City';
import ApiError from '../errors/ApiError';

interface Request {
  cityId: string;
  name?: string;
  prefect?: string;
  population?: number;
}

export default async function updateCityService ({
  cityId,
  name,
  prefect,
  population
}: Request): Promise<City> {
  const cityRepository = getRepository(City);

  const city = await cityRepository.findOne({
    where: { id: cityId }
  });

  if( !city ) {
    throw new ApiError("city don't exists", 400);
  }

  if(name) {
    const verifyNameExists = await cityRepository.findOne({
      where: { name }
    });

    if(verifyNameExists)
      throw new ApiError('name is already used in another instance', 400);
  }

  if(name) city.name = name;
  if(prefect) city.prefect = prefect;
  if(population) city.population = population;

  await cityRepository.save(city);

  return city;
}
