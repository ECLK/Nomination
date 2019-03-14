/**
 * Created by yujith on 3/5/19.
 */

import ActiveElectionRepo from './activeElection';
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
const saveActiveElectionDataToDB = async (
  { 
    saveActiveElectionTimeLineData,
    saveActiveElectionConfigData,
    saveAllowedNominatonListData,
  }) => {
  return executeTransaction(async (transaction) => {
    await ActiveElectionRepo.saveTimeLine(saveActiveElectionTimeLineData, transaction);
    await ActiveElectionRepo.saveActiveElectionConf(saveActiveElectionConfigData, transaction);
    await ActiveElectionRepo.saveAllowedNominations(saveAllowedNominatonListData, transaction);
    return true;
  });
};

export default {
  saveActiveElectionDataToDB,
};



