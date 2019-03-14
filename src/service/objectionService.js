import { ServerError , ApiError } from 'Errors';
import ObjectionRepo from '../repository/objection';
import {ObjectionManager}  from 'Managers';
import _ from 'lodash';

//******************* Start of Admin Endpoints ********************************

const updateObjectionByObjectionId = async (req) => {
  try {
    const id = req.body.id;
    const description = req.body.description;
    const created_date = req.body.created_date;
    const created_by = req.body.created_by;
    const created_by_team_id = req.body.created_by_team_id;
    const nomination_id = req.body.nomination_id;
    const objections = [{'ID':id, 'DESCRIPTION':description, 'CREATE_DATE':created_date, 
        'CREATED_BY':created_by, 'CREATED_BY_TEAM_ID':created_by_team_id, 'NOMINATION_ID':nomination_id }];
    return ObjectionRepo.insertObjections(objections);
  }catch (e){
    throw new ServerError("server error");
  }
};

const getObjectionByObjectionId = async (req) => {
  const uid = req.params.objectionId;
  const objections = await ObjectionRepo.fetchObjectionById( uid );
  if(!_.isEmpty(objections)){
    return ObjectionManager.mapToObjectionModel(objections);
  }else {
    throw new ApiError("Objection not found");
  }
};

//******************* Start of User Endpoints ********************************

const getObjectionCreatedByTeam = async (req) => {
  try {
      const objections = await ObjectionRepo.fetchObjectionCreatedByTeam(req.params.electionId, req.params.teamId);
      if (!_.isEmpty(objections)){
          return ObjectionManager.mapToObjectionModel(objections);
      } else {
          throw new ApiError("No objection found");
      }
  }catch (e){
      throw new ServerError("server error");
  }
}; 

export default {
  getObjectionByObjectionId,
  updateObjectionByObjectionId,
  getObjectionCreatedByTeam

}
