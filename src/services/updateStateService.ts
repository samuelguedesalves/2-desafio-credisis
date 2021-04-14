import { getRepository } from 'typeorm';
import State from '../models/State';
import ApiError from '../errors/ApiError';

interface Request {
  stateId: string;
  name: string;
}

export default async function updateStateService ({
  stateId,
  name
}: Request): Promise<State> {
  const stateRepository = getRepository(State);

  const state = await stateRepository.findOne({
    where: { id: stateId }
  });

  if( !state ) {
    throw new ApiError("state don't exists", 400);
  }

  state.name = name;

  await stateRepository.save(state);

  return state;
}
