import { getRepository } from 'typeorm';
import State from '../models/State';
import ApiError from '../errors/ApiError';

interface Request {
  stateId: string;
}

export default async function deleteStateService ({
  stateId,
}: Request): Promise<void> {
  const stateRepository = getRepository(State);

  const state = await stateRepository.findOne({
    where: { id: stateId }
  });

  if( !state ) {
    throw new ApiError("state don't exists", 400);
  }

  await stateRepository.delete(state.id);
}
