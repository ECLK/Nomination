import { Candidate }  from 'Models';
var joinjs = require('join-js').default;
import {List} from 'typed-immutable';
import _ from 'lodash';
import moment from 'moment';


const resultMaps = [
  {
    mapId: 'candidateMap',
    idProperty: 'ID',
    properties: ['FULL_NAME', 'PREFERRED_NAME','OCCUPATION', 'ELECTORAL_DIVISION_NAME', 'ELECTORAL_DIVISION_CODE','NIC', 'DATE_OF_BIRTH', 'GENDER','ADDRESS','COUNSIL_NAME', 'NOMINATION_ID']
  }
];


const mapToCandidateModel = (candidates) => {
  const mappedCandidates = joinjs.map(candidates, resultMaps, 'candidateMap', 'CANDIDATE_');

return _.reduce(mappedCandidates, function(result, candidate) {
  return result.push({
    "id": candidate.ID,
      "fullName": candidate.FULL_NAME,
      "preferredName": candidate.PREFERRED_NAME,
      "occupation": candidate.OCCUPATION,
      "electoralDivisionName": candidate.ELECTORAL_DIVISION_NAME,
      "electoralDivisionCode": candidate.ELECTORAL_DIVISION_CODE,
      "nic": candidate.NIC,
      "dateOfBirth": moment(new Date(candidate.DATE_OF_BIRTH)).format('YYYY-MM-DD'),
      "gender": candidate.GENDER,
      "address": candidate.ADDRESS,
      "counsilName": candidate.COUNSIL_NAME,
      "nominationId": candidate.NOMINATION_ID,
      "action": "true",

  });
},List(Candidate)());


};

export default {
  mapToCandidateModel,
};
