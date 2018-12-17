var joinjs = require('join-js').default;
import { Division } from 'Models';

const resultMaps = [
    {
        mapId: 'divisionMap',
        idProperty: 'id',
        properties: [ 'name', 'code', 'no_of_candidates', 'module_id', 'election_id', 'config_id', 'status' ]
    }
];

const mapToDivisionModel = (divisionData) => {
    const mappedDivisions = joinjs.map(divisionData, resultMaps, 'divisionMap', 'division_');

    // return Division({
    //     mappedDivisions
    // });

    return mappedDivisions;
}

export default{
    mapToDivisionModel,
}