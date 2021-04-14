import { getRepository } from 'typeorm';
import Operation from '../models/Operation';
import Account from '../models/Account';
import ApiError from '../errors/ApiError';

interface Request {
  accountId: string;
  destination_account: string;
  value: number;
  description: string;
  system: string;
}

export default async function debitOperationService ({
  accountId,
  destination_account,
  value,
  description,
  system,
}: Request) {
  const operationRepository = getRepository(Operation);
  const accountRepository = getRepository(Account);

  // find data from account
  const account = await accountRepository.findOne({
    where: { id: accountId }
  });

  if( !account ) {
    throw new ApiError("internal server error", 500);
  }

  //verify the balance
  if( account.balance < value ) {
    throw new ApiError("you don't have sufficiently money to this transaction", 400);
  }

  // verif destination account
  const destinationAccount = await accountRepository.findOne({
    where: { code: destination_account }
  });

  if(!destinationAccount){
    throw new ApiError("destination account not exist", 400);
  }

  // lower balance from account
  account.balance = ( parseFloat(`${account.balance}`) - value );
  await accountRepository.save(account);

  // upper balance from destination account
  destinationAccount.balance = ( parseFloat(`${destinationAccount.balance}`) + value );
  await accountRepository.save(destinationAccount);

  const operation = operationRepository.create({
    account_fk: accountId,
    debit: value,
    credit: 0,
    launch_type: 'debit',
    description,
    system,
  });
  await operationRepository.save(operation);

  const operationToDestinatary = operationRepository.create({
    account_fk: destinationAccount.id,
    debit: 0,
    credit: value,
    launch_type: 'credit',
    description,
    system,
  });
  await operationRepository.save(operationToDestinatary);

  return operation;
}
