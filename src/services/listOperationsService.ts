import { getRepository } from 'typeorm';
import Operation from '../models/Operation';

export default async function listOperationsService (accountId: string) {
  const operationRepository = getRepository(Operation);

  const operations = await operationRepository.find({ where: { account_fk: accountId } });

  return operations;
}
