import { getRepository } from 'typeorm';
import City from '../models/City';
import ApiError from '../errors/ApiError';

interface Request {
  cityId: string;
}

export default async function deleteStateService ({
  cityId
}: Request): Promise<void> {
  const cityRepository = getRepository(City);

  const city = await cityRepository.findOne({
    where: { id: cityId }
  });

  if( !city ) {
    throw new ApiError("city don't exists", 400);
  }

  await cityRepository.delete(city.id);
}
