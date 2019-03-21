import { ApprovedElection }  from 'Models';
import _ from "lodash";
import moment from "../candidate/candidateManager";
import {List} from "typed-immutable";
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
    {
        mapId: 'approvedElectionMap',
        idProperty: 'ID',
        properties: ['NAME', 'CREATED_BY', 'CREATED_AT','UPDATED_AT','MODULE_ID','STATUS','APPROVED_BY','APPROVED_AT']
    }
];


const mapToApprovedElectionsDataModel = (activeApprovedElections) => {

   // return activeApprovedElections;
    const mappedActiveElections = joinjs.map(activeApprovedElections, resultMaps, 'approvedElectionMap', 'APPROVED_ELECTION_');
    console.log(mappedActiveElections);

    return _.reduce(mappedActiveElections, function(result, approvedElection) {
        return result.push({

            "name": approvedElection.NAME,


        });
    },List(ApprovedElection)())
};

export default {
    mapToApprovedElectionsDataModel,
};
