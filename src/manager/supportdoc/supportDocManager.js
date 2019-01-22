import { SupportDoc }  from 'Models';
var joinjs = require('join-js').default;
import {List} from 'typed-immutable';
import _ from 'lodash';
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'supportDocMap',
    idProperty: 'ID',
    properties: ['SUPPORT_DOC_CONFIG_DATA_ID','FILE_PATH','KEY_NAME','NOMINATION_ID','STATUS']
  }
];


const mapToSupportDocModel = (supportDocs) => {
  const mappedSupportDocs = joinjs.map(supportDocs, resultMaps, 'supportDocMap', 'SUPPORT_DOC_');
  return _.reduce(mappedSupportDocs, function(result, supportDocs) {
    return result.push({
      id: supportDocs.ID,
      supportDocConfDataId: supportDocs.SUPPORT_DOC_CONFIG_DATA_ID,
      filePath: supportDocs.FILE_PATH,
      keyName: supportDocs.KEY_NAME,
      nominationId: supportDocs.NOMINATION_ID,
      status: supportDocs.STATUS,
    });
  },List(SupportDoc)());
};

export default {
  mapToSupportDocModel,
};
