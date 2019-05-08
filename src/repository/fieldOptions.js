import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';
const uuidv4 = require('uuid/v4');



const CANDIDATE_CONFIG_QUERY = `SELECT id as 'key', DESCRIPTION as 'value' FROM CANDIDATE_CONFIG`;
const CANDIDATE_SUPPORTING_DOCS_QUERY = `SELECT ID as 'key', KEY_NAME as 'value' FROM SUPPORT_DOC_CONFIG WHERE DOC_CATEGORY LIKE 'CANDIDATE' OR DOC_CATEGORY LIKE 'NOMINATION'  `;
const ELECTORATES_QUERY = `SELECT ID as 'id', NAME as 'name' FROM DIVISION_CONFIG WHERE MODULE_ID=:id  `;

const fetchCandidateConfig = (moduleId) => {
  const params = {id: moduleId};
  return DbConnection()
      .query(CANDIDATE_CONFIG_QUERY,
          {
              replacements: params,
              type: DbConnection().QueryTypes.SELECT,
          }).catch((error) => {
          throw new DBError(error);
      });
};

const fetchCandidateSupportingDocs = (moduleId) => {
  const params = {id: moduleId};
  return DbConnection()
      .query(CANDIDATE_SUPPORTING_DOCS_QUERY,
          {
              replacements: params,
              type: DbConnection().QueryTypes.SELECT,
          }).catch((error) => {
          throw new DBError(error);
      });
};

const fetchElectorates = (moduleId) => {
  const params = {id: moduleId};
  return DbConnection()
      .query(ELECTORATES_QUERY,
          {
              replacements: params,
              type: DbConnection().QueryTypes.SELECT,
          }).catch((error) => {
          throw new DBError(error);
      });
};

export default {
  fetchCandidateConfig,
  fetchCandidateSupportingDocs,
  fetchElectorates
};
