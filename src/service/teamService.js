/**
 * Created by Yujith on 15/11/18.
 */
import _ from 'lodash';
import Team from '../repository/team';
import {UserManager}  from 'Managers'


const getTeamByUserId = async (req) => {
  const uid = req.params.uid;
  return Team.fetchTeamById( uid );
};

const updateTeamByTeamId = async (req) => {
  const id = req.body.id;
  const name = req.body.name;
  const team_type = req.body.team_type;
  const name_of_secratery = req.body.name_of_secratery;
  const address_of_secratery = req.body.address_of_secratery;
  return Team.updateTeam( id, name,team_type,name_of_secratery,address_of_secratery);
};

export default {
  getTeamByUserId,updateTeamByTeamId
}