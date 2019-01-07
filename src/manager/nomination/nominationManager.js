import {Nomination} from 'Models';
var joinjs = require('join-js').default;

// TODO: CLEMENT - INCOMPLETE NOMINATION MANAGER

const resultMaps = [
    {
        mapId: 'nominationMap',
        idProperty: 'id',
        properties: ['id', 'status', 'team_id', 'election_id']
    }
]