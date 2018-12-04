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
  console.log("=======>",candidates);
  const mappedCandidates = joinjs.map(candidates, resultMaps, 'candidateMap');

  //just an example how to convert row data object to Model
  return Candidate({
    ID: mappedCandidates[0].ID,
    FULL_NAME: mappedCandidates[0].FULL_NAME,
    OCCUPATION: mappedCandidates[0].OCCUPATION,
    ELECTORAL_DIVISION_NAME: mappedCandidates[0].ELECTORAL_DIVISION_NAME,
    ELECTORAL_DIVISION_CODE: mappedCandidates[0].ELECTORAL_DIVISION_CODE,
    NOMINATION_ID: mappedCandidates[0].NOMINATION_ID,
  });
};

export default {
  mapToCandidateModel,
};
