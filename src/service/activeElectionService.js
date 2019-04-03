import { ServerError , ApiError } from 'Errors';
import ActiveElectionRepo from '../repository/activeElection';
import {ActiveElectionManager}  from 'Managers';
import _ from 'lodash';
import { executeTransaction } from '../repository/TransactionExecutor';
const uuidv4 = require('uuid/v4');



const updateActiveElectionByActiveElectionId = async (req) => {

  try {
    const id = uuidv4();
    const name = req.body.name;
    const module_id = req.body.module_id;
    const created_by = req.body.created_by;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;

    const activeElections = {'id':id, 'name':name, 'created_by':created_by, 'created_at':created_at, 'updated_at':updated_at, 'module_id':module_id};
    console.log("activeElections",activeElections);

    return await ActiveElectionRepo.insertActiveElections(activeElections);
  }catch (e){
    throw new ServerError("server error");
  }
};

//Return Allow nomination list
const saveAllowedNominatonList = async (req,electionId) => {
  try {
    var nominationAllowData = req.body.nominationAllowData;
    var i=0;
    var nominationAllow = []; //TODO: yujith, validate electionTimeLineConfigId and electionId and filePath
        for (var {team_id: team_id,division_id: division_id} of nominationAllowData) {
          nominationAllow[i] = {'status':'NEW','team_id':team_id,'created_by':'123','created_at':'123','updated_at':'123', 'election_id':electionId,'division_id':division_id};
          i++;
        }
  return nominationAllow;
  }catch (e){
    throw new ServerError("server error");
  }
};

/**
 * @param req
 * @returns {Promise.<void>}
 */
const saveActiveElectionData = async (req) => {
  try {
  return executeTransaction(async (transaction) => {
    let electionId = req.params.electionId;
  if(electionId !== undefined){
    const name = req.body.name;
    const module_id = req.body.module_id;
    const created_by = req.body.created_by;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;
    const activeElections = {'id':electionId, 'name':name, 'created_by':created_by, 'created_at':created_at, 'updated_at':updated_at, 'module_id':module_id};
  await ActiveElectionRepo.updateActiveElections(activeElections,transaction);
  }else{
    electionId = uuidv4();
    const name = req.body.name;
    const module_id = req.body.module_id;
    const created_by = req.body.created_by;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;
    const activeElections = {'id':electionId, 'name':name, 'created_by':created_by, 'created_at':created_at, 'updated_at':updated_at, 'module_id':module_id};
  await ActiveElectionRepo.insertActiveElections(activeElections,transaction);
  }
  const id  = uuidv4();
  const pendingStatusData = {id:id,status:'PENDING',created_by: req.body.created_by,created_at:req.body.created_at,updated_at:req.body.updated_at,electionId:electionId};

      await ActiveElectionRepo.saveElectionTimeLine(electionId,req.body.timeLineData, transaction);
      const saveAllowedNominatonListData =  await saveAllowedNominatonList(req,electionId);
      await ActiveElectionRepo.saveAllowedNominations(electionId,saveAllowedNominatonListData, transaction);
      await ActiveElectionRepo.savePendingElectionStatus(pendingStatusData, transaction);
    return true;
  });
}catch (e){
  console.log(e);
  throw new ServerError("server error");
}
};

const getActiveElectionByActiveElectionId = async (req) => {
  const uid = req.params.activeElectionId;
  const activeElections = await ActiveElectionRepo.fetchActiveElectionById( uid );
  if(!_.isEmpty(activeElections)){
    return ActiveElectionManager.mapToActiveElectionModel(activeElections);
  }else {
    throw new ApiError("ActiveElection not found");
  }
};

//approve election by election id
const saveApproveElectionByElectionId = async (req) => {
  try {
    const updatedAt = req.body.updatedAt;
    const status = req.body.status;
    const electionId = req.params.electionId;
      const electionData = {'updatedAt':updatedAt, 'status':status,'electionId':electionId};
      console.log("electionData",electionData);
      return await ActiveElectionRepo.updateElectionStatus( electionData );
  }catch (error){
    console.log(error);
    throw new ServerError("Server error", HTTP_CODE_404);
  }
};

export default {
  getActiveElectionByActiveElectionId,
  updateActiveElectionByActiveElectionId,
  saveActiveElectionData,
  saveApproveElectionByElectionId
}