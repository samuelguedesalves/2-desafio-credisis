import { getRepository } from 'typeorm';
import City from '../models/City';

export default async function listCitiesService (): Promise<City[]> {
  const cityRepository = getRepository(City);

  const cities = await cityRepository.find();

  return cities;
}
