/**
 * Created by ananda on 11/4/18.
 */
import _ from 'lodash';
import Team from '../repository/team';
import {UserManager}  from 'Managers'


const getTeamByUserId = async (req) => {
  const uid = req.params.uid;
  return Team.fetchTeamById( uid );
};

export default {
  getTeamByUserId,
}