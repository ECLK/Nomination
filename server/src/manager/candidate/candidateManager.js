import { Candidate } from 'Models';
var joinjs = require('join-js').default;
import { List } from 'typed-immutable';
import _ from 'lodash';
import moment from 'moment';


const resultMaps = [
  {
    mapId: 'candidateMap',
    idProperty: 'ID',
    // properties: ['FULL_NAME', 'DES','OCCUPATION','NIC', 'DATE_OF_BIRTH', 'GENDER','ADDRESS', 'NOMINATION_ID']
    properties: ['CONFIG_ID', 'KEY_NAME', 'VALUE']
  }
];


const mapToCandidateModel = (candidates) => {
  console.log('candidates', candidates);
  var groupedCandidates = _.groupBy(candidates, 'CANDIDATE_ID');
  var expected = _.map(groupedCandidates, function (candidateProperties) {
    var orderedProps = [];
    var id = "";
    _.each(candidateProperties, function (property) {
      orderedProps.push(property);
      id = property.CANDIDATE_ID;
    });
    orderedProps = _.sortBy(orderedProps, 'CANDIDATE_CONFIG_ID');

    var candidateInfoMap = { CANDIDATE_ID: id };
    _.each(orderedProps, function (property) {
      if (property.CANDIDATE_KEY_NAME === 'DATE_OF_BIRTH') {
        candidateInfoMap[property.CANDIDATE_KEY_NAME] = moment(new Date(parseInt(property.CANDIDATE_VALUE))).format('YYYY-MM-DD');
      } else {
        candidateInfoMap[property.CANDIDATE_KEY_NAME] = property.CANDIDATE_VALUE;
      }
    });

    return candidateInfoMap;
  });
  console.log('expected', expected);
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

const mapToPartyCandidateModel = (candidates, party_list, division_list) => {
  console.log('party_list', party_list);
  var groupedCandidates = _.groupBy(candidates, 'CANDIDATE_ID');
  console.log('division_list', division_list);
  var expected = _.map(groupedCandidates, function (candidateProperties) {
    var orderedProps = [];
    var id = "";
    _.each(candidateProperties, function (property) {
      orderedProps.push(property);
      id = property.CANDIDATE_ID;
    });
    orderedProps = _.sortBy(orderedProps, 'CANDIDATE_CONFIG_ID');

    var candidateInfoMap = { CANDIDATE_ID: id };
    _.each(orderedProps, function (property) {
      if (property.CANDIDATE_KEY_NAME === 'DATE_OF_BIRTH') {
        candidateInfoMap[property.CANDIDATE_KEY_NAME] = moment(new Date(parseInt(property.CANDIDATE_VALUE))).format('YYYY-MM-DD');
      } else {
        candidateInfoMap[property.CANDIDATE_KEY_NAME] = property.CANDIDATE_VALUE;
      }
    });

    return candidateInfoMap;
  });

  if (party_list) {
    const expectedWithParty = party_list.map(item => {
      //check and change the team_id variable name after finishing the party list endpoint
      const item2 = expected.find(o => o.team_id === item.team_id);
      return { ...item, ...item2 };
    });
  }
  if (division_list) {
    const expectedWithPartyDivision = division_list.map(item => {
      //check and change the vivision_id variable name after finishing the division list endpoint
      const item2 = expectedWithParty.find(o => o.division_id === item.division_id);
      return { ...item, ...item2 };
    });
  }

  console.log('expected', expected);
  return expected;
};

export default {
  mapToCandidateModel,
  mapToPartyCandidateModel
};
