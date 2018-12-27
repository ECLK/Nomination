var joinjs = require('join-js').default;
import { Division } from 'Models';
import {List} from 'typed-immutable';
import _ from 'lodash';

const resultMaps = [
    {
        mapId: 'divisionMap',
        idProperty: 'id',
        properties: [ 'name', 'code', 'no_of_candidates', 'module_id', 'election_id', 'config_id', 'status' ]
    }
];

const mapToDivisionModel = (divisionData) => {
    const mappedDivisions = joinjs.map(divisionData, resultMaps, 'divisionMap', 'division_');

    return _.reduce(mappedDivisions, function(result, division){
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

    return mappedDivisions;
}

export default{
    mapToDivisionModel,
}