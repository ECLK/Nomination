import { Nomination,NominationNotification } from 'Models';
var joinjs = require('join-js').default;
import {List} from 'typed-immutable';
import _ from 'lodash';

const resultMaps = [
    {
        mapId: 'nominationMap',
        idProperty: 'id',
        properties: ['party', 'division_name','payment_status', 'objection_status','objection_status','approval_status','review_note'],
        collections: [
			{ name: 'Candidates', mapId: 'candidateMap', columnPrefix: 'candidate_' }
		]
    },
    {
		mapId: 'candidateMap',
		idProperty: 'id',
		properties: ['name','nic','occupation','address']
    },
    {
        mapId: 'nominationNotificationMap',
        idProperty: 'id',
        properties: ['party', 'division_name','payment_status', 'objection_status','objection_status','approval_status','review_note']
    },
];


const mapToNominationModel = (nominationData) => {
    const mappedNominations = joinjs.map(nominationData, resultMaps, 'nominationMap', 'nomination_');
    return _.reduce(mappedNominations, function(result, nomination) {
        return result.push({
            id: nomination.id,
            division_name: nomination.division_name,
            party: nomination.party,
            payment_status: nomination.payment_status,
            objection_status: nomination.objection_status,
            approval_status: nomination.approval_status,
            candidates: nomination.Candidates,
            reviewNote: nomination.review_note
        });
      },List(Nomination)());
};

const mapToNominationNotificationModel = (nominationData) => {
    const mappedNominations = joinjs.map(nominationData, resultMaps, 'nominationNotificationMap', 'nomination_');

    return _.reduce(mappedNominations, function(result, nomination) {
        return result.push({
            id: nomination.id,
            division_name: nomination.division_name,
            party: nomination.party,
            payment_status: nomination.payment_status,
            objection_status: nomination.objection_status,
            approval_status: nomination.approval_status,
            reviewNote: nomination.review_note
        });
      },List(NominationNotification)());
};



export default {
    mapToNominationModel,
    mapToNominationNotificationModel
};