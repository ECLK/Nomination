
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'nominationMap',
    idProperty: ['nomination_id','division_id'],
    properties: ['nomination_id', 'division_id','status']
  }
];


const mapToNominationEntryModel = (nominationEntries) => {
  const mappedNominationEntries = joinjs.map(nominationEntries, resultMaps, 'nominationEntriesMap', 'nominationEntries_');

  //just an example how to convert row data object to Model
  // if (mappedNominationEntries.length>0){
  //   const userModel = User({
  //     id: mappedNominationEntries[0].id,
  //     name: mappedNominationEntries[0].name,
  //   });
  //   console.log("userModel.id >>>>>>>", userModel.get("id"));
  // }

  return mappedNominationEntries;
};

export default {
  mapToNominationEntryModel
};
