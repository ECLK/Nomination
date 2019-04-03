var joinjs = require('join-js').default;
import { Division, AllowedDivision } from 'Models';
import {List} from 'typed-immutable';
import _ from 'lodash';

const resultMaps = [
    {
        mapId: 'divisionMap',
        idProperty: 'id',
        properties: [ 'name', 'code', 'no_of_candidates', 'module_id', 'election_id', 'config_id', 'status' ]
    },
    {
        mapId: 'allowedDivisionMap',
        idProperty: 'id',
        properties: ['name', 'code', 'no_of_candidates', 'election_id', 'team_id','current_candidate_count'],
        collections: [
            { name: 'nomination', mapId: 'nominationMap', columnPrefix: 'nomination_' }
        ]
    },
    {
        mapId: 'nominationMap',
        idProperty: 'id',
        properties: [ 'status']
    },
    
]

const mapToDivisionModel = (divisionData) => {
    const mappedDivisions = joinjs.map(divisionData, resultMaps, 'divisionMap', 'division_');

    return _.reduce(mappedDivisions, (result, division) => {
        return result.push({
            id: division.id,
            name: division.name,
            code: division.code,
            noOfCandidates: division.no_of_candidates,
            moduleId: division.module_id,
            electionId: division.election_id,
            configId: division.config_id,
            status: division.status,
        });
    }, List(Division)());
};


const mapToDivisionModelWithNominations = (divisionDataWithNomination) => {
    const mappedAllowedDivisions = joinjs.map(divisionDataWithNomination, resultMaps, 'allowedDivisionMap', 'division_');

    return _.reduce(mappedAllowedDivisions, (result, division) => {
        return result.push({
            id: division.id,
            name: division.name,
            code: division.code,
            noOfCandidates: division.no_of_candidates,
            electionId: division.election_id,
            teamId: division.team_id,
            currentCandidateCount: division.current_candidate_count,
            nomination: division.nomination,
        });
    }, List(AllowedDivision)());
};

export default{
    mapToDivisionModel,
    mapToDivisionModelWithNominations,
}
