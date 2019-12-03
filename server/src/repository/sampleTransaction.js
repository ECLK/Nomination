/**
 * TODO : rename the file and content according to the actual transaction by @Udith
 * Created by ananda on 3/5/19.
 */

import ObjectionRepo from './objection';
import PaymentRepo from './payment';
import { executeTransaction } from './TransactionExecutor';


/**
 * Rename the following method accordingly. following both 'Create objection' and 'update nomination status'
 * execute as a single transaction
 * @param objectionId
 * @param ObjectionDes
 * @param nominationId
 * @param nominationStatus
 * @returns {Promise.<*>}
 */
const saveRecordsToDB = async (
  { objectionId,
    ObjectionDes,
    nominationId,
    nominationStatus,
  }) => {
  return executeTransaction(async (transaction) => {
    await ObjectionRepo.sampleTransactionCreateObjection(objectionId, ObjectionDes, transaction);
    await PaymentRepo.sampleTransactionUpdateStatusByNominationId(nominationId, nominationStatus, transaction);
  });
};

export default {
  saveRecordsToDB,
};



