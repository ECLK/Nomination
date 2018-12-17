import { Nomination } from 'Models';
var joinjs = require('join-js').default;
const { Map, List } = require('immutable');

const resultMaps = [
    {
        mapId: 'nominationMap',
        idProperty: 'id',
        properties: ['status', 'team_id', 'election_id', 'division_config_data_id']
    }
];

const mapToNominationModel = (nominationData) => {
    const mappedNominations = joinjs.map(nominationData, resultMaps, 'nominationMap', 'nomination_');

    // return Nomination({
    //     id: mappedNominations[0].id,
    //     status: mappedNominations[0].status,
    //     teamId: mappedNominations[0].team_id,
    //     electionId: mappedNominations[0].election_id,
    //     divisionConfigDataId: mappedNominations[0].division_config_data_id,
    // });
    
    return mappedNominations;

};

export default {
    mapToNominationModel,
};