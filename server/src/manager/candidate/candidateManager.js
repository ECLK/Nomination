import { Candidate }  from 'Models';
var joinjs = require('join-js').default;
import {List} from 'typed-immutable';
import _ from 'lodash';
import moment from 'moment';


const resultMaps = [
  {
    mapId: 'candidateMap',
    idProperty: 'ID',
    // properties: ['FULL_NAME', 'DES','OCCUPATION','NIC', 'DATE_OF_BIRTH', 'GENDER','ADDRESS', 'NOMINATION_ID']
    properties: ['CONFIG_ID', 'KEY_NAME','VALUE']
  }
];


const mapToCandidateModel = (candidates) => {
  var groupedCandidates = _.groupBy(candidates, 'CANDIDATE_ID');
  var expected = _.map(groupedCandidates, function (candidateProperties) {
    var orderedProps = [];
    var id = "";
    _.each(candidateProperties, function (property) {
      orderedProps.push(property);
      id = property.CANDIDATE_ID;
    });
    orderedProps = _.sortBy(orderedProps, 'CANDIDATE_CONFIG_ID');

    var candidateInfoMap = {CANDIDATE_ID:id};
    _.each(orderedProps, function (property) {
      if(property.CANDIDATE_KEY_NAME === 'DATE_OF_BIRTH'){
        candidateInfoMap[property.CANDIDATE_KEY_NAME] = moment(new Date(parseInt(property.CANDIDATE_VALUE))).format('YYYY-MM-DD');
      }else{
        candidateInfoMap[property.CANDIDATE_KEY_NAME] = property.CANDIDATE_VALUE;
      }
    });
    
    return candidateInfoMap;
  });
  console.log('expected',expected);
  return expected;
  // const mappedCandidates = joinjs.map(candidates, resultMaps, 'candidateMap', 'CANDIDATE_');
//   const mappedCandidates = expected;

//   console.log("mappedCandidatesmappedCandidatesmappedCandidates",mappedCandidates);
// return _.reduce(mappedCandidates, function(result, candidate) {
  
//   return result.push({
//     "id": candidate.ID,
//       "configId": candidate.CONFIG_ID,
//       "keyName": candidate.KEY_NAME,
//       "value": candidate.VALUE

//   });
// },List(Candidate)());


};

export default {
  mapToCandidateModel,
};
