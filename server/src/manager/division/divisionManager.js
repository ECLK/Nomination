var joinjs = require('join-js').default;
import { Division, AllowedDivision,DivisionData } from 'Models';
import {List} from 'typed-immutable';
import _ from 'lodash';

const resultMaps = [
    {
        mapId: 'divisionMap',
        idProperty: 'id',
        properties: [ 'name', 'code', 'no_of_candidates', 'module_id', 'election_id', 'config_id' ]
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
        properties: [ 'status','paymentStatus']
    },
    {
        mapId: 'divisionDataMap',
        idProperty: 'ID',
        properties: [ 'NAME'],
        collections: [
            { name: 'parties', mapId: 'partyMap', columnPrefix: 'PARTY_' }
        ]
    },
    {
        mapId: 'partyMap',
        idProperty: 'id',
        properties: [ ],
        collections: [
            { name: 'candidates', mapId: 'candidateMap', columnPrefix: 'CANDIDATE_' }
        ]
    },
    {
        mapId: 'candidateMap',
        idProperty: 'id',
        properties: [ 'name']
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
            // status: division.status
        });
    }, List(Division)());
};


const mapToDivisionModelWithNominations = (divisionDataWithNomination) => {
    console.log("divisionDataWithNomination",divisionDataWithNomination);

    const mappedAllowedDivisions = joinjs.map(divisionDataWithNomination, resultMaps, 'allowedDivisionMap', 'division_');
console.log("mappedAllowedDivisions",mappedAllowedDivisions);
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

// const mapToDivisionDataModel = (divisionData) => {
//     console.log("divisionData",divisionData);
// 	const mappedDivisionData = joinjs.map(divisionData, resultMaps, 'divisionDataMap', 'DIVISION_');
//     console.log("mappedDivisionData",mappedDivisionData);

// 	return DivisionData({
// 		id: mappedDivisionData[0].id,
// 		name: mappedDivisionData[0].name,
// 		parties: mappedDivisionData[0].parties,
// 		// candidates: mappedElection[0].candidates,
// 	});
// }

const mapToDivisionDataModel = (divisionData) => {
    console.log("divisionData",divisionData);

    const mappedDivisionData = joinjs.map(divisionData, resultMaps, 'divisionDataMap', 'DIVISION_');
console.log("mappedDivisionData",mappedDivisionData);
    return _.reduce(mappedDivisionData, (result, division) => {
        return result.push({
            id: division.ID,
            name: division.NAME,
            parties: division.parties,
        });
    }, List(DivisionData)());
};

export default{
    mapToDivisionModel,
    mapToDivisionModelWithNominations,
    mapToDivisionDataModel
}
