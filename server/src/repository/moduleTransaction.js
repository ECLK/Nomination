/**
 * Created by yujith on 3/6/19.
 */

import ModuleRepo from './module';
import { executeTransaction } from './TransactionExecutor';


/**
 * Rename the following method accordingly. following both 'Create objection' and 'update nomination status'
 * execute as a single transaction
 * @param moduleId
 * @param electionModuleConfigId
 * @param supportDocConfigId
 * @param candidateConfigId
 * @returns {Promise.<*>}
 */
const saveModuleDataToDB = async (
  { 
    saveCandidateFormConfigurationData,
    saveSupportingDocumentsData,
    saveDivisionConfigData,
    divisionCommonNameUpdate,
    saveElectionConfigData
  }) => {
  return executeTransaction(async (transaction) => {
    // await ModuleRepo.updateDivisionCommonName(divisionCommonNameUpdate, transaction);
    await ModuleRepo.saveCandidateConf(saveCandidateFormConfigurationData, transaction);
    await ModuleRepo.saveSupportDocs(saveSupportingDocumentsData, transaction);
    await ModuleRepo.saveDivisionConf(saveDivisionConfigData, transaction);
    await ModuleRepo.saveElectionConfig(saveElectionConfigData, transaction);
    return true;
  });
};

export default {
  saveModuleDataToDB,
};



