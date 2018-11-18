import _ from 'lodash';
import Team from '../repository/team';

const getTeamById = async (req) => {
    var team_id = req.params.team_id;
    return Team.getTeamInfo(team_id);
}

export default {
    getTeamById,
}