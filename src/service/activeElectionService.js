import { ServerError , ApiError } from 'Errors';
import ActiveElectionRepo from '../repository/activeElection';
import {ActiveElectionManager}  from 'Managers';
import _ from 'lodash';
const uuidv4 = require('uuid/v4');
import ActiveElectionTransactionService  from '../repository/activeElectionTransaction'




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

//Save Call Election Time Line
const saveActiveElectionTimeLine = async (req) => {
  try {
    var timeLineData = req.body.timeLineData;
    var i=0;
    var timeLine = []; //TODO: yujith, validate electionTimeLineConfigId and electionId and filePath
       for (var {electionTimeLineConfigId: electionTimeLineConfigId, value: value,electionId: electionId} of timeLineData) {
          const id = uuidv4();
          timeLine[i] = {'id':id,'electionTimeLineConfigId':electionTimeLineConfigId,'value':value, 'electionId':electionId};
         i++;
       }
       return timeLine;
  }catch (e){
    throw new ServerError("server error");
  }
};

//Save Call Election Config
const saveActiveElectionConfig = async (req) => {
  try {
    var confData = req.body.confData;
    var i=0;
    var config = []; //TODO: yujith, validate electionTimeLineConfigId and electionId and filePath
       for (var {electionConfigId: electionConfigId, value: value,electionId: electionId} of confData) {
          const id = uuidv4();
          config[i] = {'id':id,'electionConfigId':electionConfigId,'value':value, 'electionId':electionId};
         i++;
       }
       return config;
  }catch (e){
    throw new ServerError("server error");
  }
};

    //Save Allow nomination list
    const saveAllowedNominatonList = async (req) => {
      try {
        var nominationAllowData = req.body.nominationAllowData;
        var i=0;
        var nominationAllow = []; //TODO: yujith, validate electionTimeLineConfigId and electionId and filePath
           for (var {team_id: team_id, election_id: election_id,division_id: division_id} of nominationAllowData) {
              const id = uuidv4();
              nominationAllow[i] = {'id':id,'status':'DRAFT','team_id':team_id,'created_by':'123','created_at':'123','updated_at':'123', 'election_id':election_id,'division_id':division_id};
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
      console.log(req.body);

      try {
        const saveActiveElectionTimeLineData = await saveActiveElectionTimeLine(req);
        const saveActiveElectionConfigData =  await saveActiveElectionConfig(req);
        const saveAllowedNominatonListData =  await saveAllowedNominatonList(req);

        await ActiveElectionTransactionService.saveActiveElectionDataToDB({
          saveActiveElectionTimeLineData,
          saveActiveElectionConfigData,
          saveAllowedNominatonListData,
        });
      }catch (e){
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

export default {
  getActiveElectionByActiveElectionId,
  updateActiveElectionByActiveElectionId,
  saveActiveElectionData
}