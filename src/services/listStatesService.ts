import { getRepository } from 'typeorm';
import State from '../models/State';

export default async function listStatesService (): Promise<State[]> {
  const stateRepository = getRepository(State);

  const states = await stateRepository.find();

  return states;
}
