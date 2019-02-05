var joinjs = require('join-js').default;
import { Objection } from 'Models';
import { List } from 'typed-immutable';
import _ from 'lodash';

const resultMaps = [
    {
        mapId: 'objectionMap',
        idProperty: 'id',
        properties: [
            'description', 'created_at', 'created_by', 'created_by_team_id', 'nomination_id'
        ]
    },
]

const mapToObjectionModel = (objectionData) => {
    console.log(objectionData);
    const mappedData = joinjs.map(objectionData, resultMaps, 'objectionMap', 'objection_');
    
    return _.reduce(mappedData, (result, objection) => {
        return result.push({
            id: objection.id,
            description: objection.description,
            createdAt: objection.created_at,
            createdBy: objection.created_by,
            createdByTeamId: objection.created_by_team_id,
            nominationId: objection.nomination_id,
        });
    }, List(Objection)());
};

export default{
    mapToObjectionModel,
}
