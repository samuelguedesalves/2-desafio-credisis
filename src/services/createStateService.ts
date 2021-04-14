import { getRepository } from 'typeorm';
import State from '../models/State';
import ApiError from '../errors/ApiError';

interface Request {
  name: string;
}

export default async function createStateService ({
  name,
}: Request) {
  if( !name ) throw new ApiError("are missing 'name' param", 400);
  const stateRepository = getRepository(State);

  const stateExists = await stateRepository.findOne({
    where: { name }
  });

  if( stateExists ) {
    throw new ApiError("state already exists", 400);
  }

  const state = stateRepository.create({
    name,
  });

  await stateRepository.save(state);

  return state;
}
