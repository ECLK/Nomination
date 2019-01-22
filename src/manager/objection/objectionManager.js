var joinjs = require('join-js').default;
import { Objection } from 'Models';
import { List } from 'typed-immutable';
import _ from 'lodash';

const resultMaps = [
    {
        mapId: 'objectionMap',
        idProperty: 'id',
        properties: [
            'description', 'create_date', 'create_by', 'create_by_team_id', 'nomination_id'
        ]
    },
]

const mapToObjectionModel = (objectionData) => {
    const mappedData = joinjs.map(objectionData, resultMaps, 'objectionMap', 'objection_');
    
    return _.reduce(mappedData, (result, objection) => {
        return result.push({
            id: objection.id,
            description: objection.description,
            createDate: objection.create_date,
            createBy: objection.create_by,
            createByTeamId: objection.create_by_team_id,
            nominationId: objection.nomination_id,
        });
    }, List(Objection)());
};

export default{
    mapToObjectionModel,
}