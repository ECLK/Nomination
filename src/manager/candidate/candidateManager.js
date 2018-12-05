import { Candidate }  from 'Models';
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'candidateMap',
    idProperty: 'ID',
    properties: ['FULL_NAME','OCCUPATION', 'ELECTORAL_DIVISION_NAME', 'ELECTORAL_DIVISION_CODE','NOMINATION_ID']
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
    nominationId: mappedCandidates[0].NOMINATION_ID,
    
  });
};

export default {
  mapToCandidateModel,
};
