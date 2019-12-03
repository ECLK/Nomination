import { SupportDoc, CandidateSupportDoc,CandidateSupportDocData}  from 'Models';
var joinjs = require('join-js').default;
import {List} from 'typed-immutable';
import _ from 'lodash';
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'supportDocMap',
    idProperty: 'ID',
    properties: ['SUPPORT_DOC_CONFIG_ID','ORIGINAL_NAME','FILE_PATH','KEY_NAME','NOMINATION_ID','STATUS']
  },
  {
    mapId: 'candidateSupportDocMap',
    idProperty: 'ID',
    properties: ['KEY_NAME','DESCRIPTION','DOC_CATEGORY']
  },
  {
		mapId: 'candidateSupportdocDataMap',
		idProperty: 'id',
		properties: ['originalname', 'filename']
	}
];



const mapToSupportDocModel = (supportDocs) => {
  const mappedSupportDocs = joinjs.map(supportDocs, resultMaps, 'supportDocMap', 'SUPPORT_DOC_');
  return _.reduce(mappedSupportDocs, function(result, supportDocs) {
    return result.push({
      id: supportDocs.ID,
      supportDocConfId: supportDocs.SUPPORT_DOC_CONFIG_ID,
      originalName:supportDocs.ORIGINAL_NAME,
      filePath: supportDocs.FILE_PATH,
      keyName: supportDocs.KEY_NAME,
      nominationId: supportDocs.NOMINATION_ID,
      status: supportDocs.STATUS,
    });
  },List(SupportDoc)());
};

const mapToCandidateSupportDocModel = (supportDocs) => {
  const mappedSupportDocs = joinjs.map(supportDocs, resultMaps, 'candidateSupportDocMap', 'SUPPORT_DOC_');
  
  return _.reduce(mappedSupportDocs, function(result, supportDocs) {
    return result.push({
      id: supportDocs.ID,
      keyName: supportDocs.KEY_NAME,
      description: supportDocs.DESCRIPTION,
      docCategory: supportDocs.DOC_CATEGORY,
    });
  },List(CandidateSupportDoc)());
};

const mapToCandidateSupportDocDataModel = (supportDocs) => {
  const mappedSupportDocs = joinjs.map(supportDocs, resultMaps, 'candidateSupportdocDataMap', 'SUPPORT_DOC_');

  return _.reduce(mappedSupportDocs, function(result, supportDocs) {
    return result.push({
      id: supportDocs.id,
      originalname: supportDocs.originalname,
      filename: supportDocs.filename
    });
  },List(CandidateSupportDocData)());
};

export default {
  mapToSupportDocModel,
  mapToCandidateSupportDocModel,
  mapToCandidateSupportDocDataModel
};
