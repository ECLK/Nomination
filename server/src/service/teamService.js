import { ServerError , ApiError } from 'Errors';
import TeamRepo from '../repository/team';
import {TeamManager}  from 'Managers';
import _ from 'lodash';
import {HTTP_CODE_404} from '../routes/constants/HttpCodes';



const getTeamById = async (req) => {
  try {
    const teamId = req.params.teamId;
    const teams = await TeamRepo.fetchTeamById( teamId );

    if(!_.isEmpty(teams)){
      return TeamManager.mapToTeamModel(teams)
    }else {
      throw new ApiError("Team not found",HTTP_CODE_404);
    }
  }catch (e){
    throw new ServerError("server error");
  }
  
};

//Get all teams
const getAllTeams = async (req) => {
  try {
    const teams = await TeamRepo.fetchAllTeams();
    if(!_.isEmpty(teams)){
      return teams;
    }else {
      return [];
    }
  }catch (e){
    console.log(e);
    throw new ServerError("server error");
  }
  
};



export default {
    getTeamById,
    getAllTeams
}