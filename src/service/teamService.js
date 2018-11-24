import _ from 'lodash';
import Team from '../repository/team';

const getTeamById = async (req) => {
    var team_id = req.params.team_id;
    return Team.getTeamInfo(team_id);
}

const updateTeamById = async (req) => {
    const id = req.body.id;
    const name = req.body.name;
    const type = req.body.type;
    const name_of_secratery = req.body.name_of_secratery;
    const address_of_secratery = req.body.address_of_secratery;
    return Team.updateTeam(id, name, type, name_of_secratery, address_of_secratery);
}

export default {
    getTeamById,
    updateTeamById,
}