import { Nomination } from 'Models';
var joinjs = require('join-js').default;
import {List} from 'typed-immutable';
import _ from 'lodash';

const resultMaps = [
    {
        mapId: 'nominationMap',
        idProperty: 'id',
        properties: ['status', 'team_id', 'election_id', 'division_config_data_id']
    }
];

const mapToNominationModel = (nominationData) => {
    const mappedNominations = joinjs.map(nominationData, resultMaps, 'nominationMap', 'nomination_');

    return _.reduce(mappedNominations, function(result, nomination) {
        return result.push({
            id: nomination.id,
            status: nomination.status,
            teamId: nomination.team_id,
            electionId: nomination.election_id,
            divisionConfigDataId: nomination.division_config_data_id,
        });
      },List(Nomination)());
    

};

export default {
    mapToNominationModel,
};