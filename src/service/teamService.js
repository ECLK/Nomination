import { ServerError , ApiError } from 'Errors';
import TeamRepo from '../repository/team';
import {TeamManager}  from 'Managers'
import _ from 'lodash';

const getTeamById = async (req) => {
  const teamId = req.params.teamId;
  console.log("------->",teamId);
  const teams = await TeamRepo.fetchTeamById( teamId );
  if(!_.isEmpty(teams)){
    return TeamManager.mapToTeamModel(teams)
  }else {
    throw new ApiError("Team not found");
  }
};

/**
 * To be refactor and use for update request @cleman
 */
// const updateTeamById = async (req) => {
//     const id = req.body.id;
//     const name = req.body.name;
//     const type = req.body.type;
//     const name_of_secratery = req.body.name_of_secratery;
//     const address_of_secratery = req.body.address_of_secratery;
//     return Team.updateTeam(id, name, type, name_of_secratery, address_of_secratery);
// };

export default {
    getTeamById,
    // updateTeamById,
}