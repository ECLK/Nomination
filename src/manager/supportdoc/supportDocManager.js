import { SupportDoc }  from 'Models';
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'supportDocMap',
    idProperty: 'ID',
    properties: ['SUPPORT_DOC_CONFIG_DATA_ID','FILE_PATH','NOMINATION_ID']
  }
];


const mapToSupportDocModel = (supportDocs) => {
  
  const mappedSupportDocs = joinjs.map(supportDocs, resultMaps, 'supportDocMap', 'SUPPORT_DOC_');

  return SupportDoc({
    id: mappedSupportDocs[0].ID,
    supportDocConfDataId: mappedSupportDocs[0].SUPPORT_DOC_CONFIG_DATA_ID,
    filePath: mappedSupportDocs[0].FILE_PATH,
    nominationId: mappedSupportDocs[0].NOMINATION_ID,
    
  });

};

export default {
  mapToSupportDocModel,
};
