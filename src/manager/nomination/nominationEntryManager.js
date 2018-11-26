
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'electionMap',
    idProperty: 'id',
    properties: ['election_module_flag'],
    collections: [
      { name: 'payments', mapId: 'paymentMap', columnPrefix: 'payment_' },

  ]
  },
  {
    mapId: 'paymentMap',
    idProperty: 'id',
    properties: [
              'depositor',
              'deposit_amount',
              'deposit_date',
              'uploaded_file_name',
              'nomination_id'
            ],
    
  }
];


const mapToNominationEntryModel = (nominationEntries) => {
  const mappedNominationEntries = joinjs.map(nominationEntries, resultMaps, 'electionMap', 'election_');
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
