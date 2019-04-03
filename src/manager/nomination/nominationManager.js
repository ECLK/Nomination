import { Nomination } from 'Models';
var joinjs = require('join-js').default;
import {List} from 'typed-immutable';
import _ from 'lodash';

const resultMaps = [
    {
        mapId: 'nominationMap',
        idProperty: 'id',
        properties: ['party', 'division_name','payment_status', 'objection_status','objection_status','approval_status'],
        collections: [
			{ name: 'Candidates', mapId: 'candidateMap', columnPrefix: 'candidate_' }
		]
    },
    {
		mapId: 'candidateMap',
		idProperty: 'id',
		properties: ['name','nic','occupation','address']
	},
];

const mapToNominationModel = (nominationData) => {
    const mappedNominations = joinjs.map(nominationData, resultMaps, 'nominationMap', 'nomination_');
    return _.reduce(mappedNominations, function(result, nomination) {
        console.log("mappedNominations",nomination.Candidates);
        return result.push({
            id: nomination.id,
            division_name: nomination.division_name,
            party: nomination.party,
            payment_status: nomination.payment_status,
            objection_status: nomination.objection_status,
            approval_status: nomination.approval_status,
            candidates: nomination.Candidates,
        });
      },List(Nomination)());
};

export default {
    mapToNominationModel,
};