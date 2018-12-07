import { Candidate }  from 'Models';
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'candidateMap',
    idProperty: 'ID',
    properties: ['FULL_NAME','OCCUPATION', 'ELECTORAL_DIVISION_NAME', 'ELECTORAL_DIVISION_CODE','NIC', 'DATE_OF_BIRTH', 'GENDER','ADDRESS','NOMINATION_ID']
  }
];


const mapToCandidateModel = (candidates) => {
  
  const mappedCandidates = joinjs.map(candidates, resultMaps, 'candidateMap', 'CANDIDATE_');

  return Candidate({
    id: mappedCandidates[0].ID,
    fullName: mappedCandidates[0].FULL_NAME,
    occupation: mappedCandidates[0].OCCUPATION,
    electoralDivisionName: mappedCandidates[0].ELECTORAL_DIVISION_NAME,
    electoralDivisionCode: mappedCandidates[0].ELECTORAL_DIVISION_CODE,
    nic: mappedCandidates[0].NIC,
    dateOfBirth: mappedCandidates[0].DATE_OF_BIRTH,
    gender: mappedCandidates[0].GENDER,
    address: mappedCandidates[0].ADDRESS,
    nominationId: mappedCandidates[0].NOMINATION_ID,
    
  });

};

export default {
  mapToCandidateModel,
};
