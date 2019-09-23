import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';
const uuidv4 = require('uuid/v4');



const CANDIDATE_CONFIG_QUERY = `SELECT id as 'key', DESCRIPTION as 'value' FROM CANDIDATE_CONFIG`;
const SUPPORTING_DOCS_QUERY = `SELECT ID AS 'key', 
                                        KEY_NAME AS 'value' ,
                                        DOC_CATEGORY  AS  'doc_category',
                                        CATEGORY AS 'category'
                                        FROM SUPPORT_DOC_CONFIG WHERE DOC_CATEGORY= :category  `;
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

const fetchSupportingDocs = (category) => {
  const params = {category: category};
  return DbConnection()
      .query(SUPPORTING_DOCS_QUERY,
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
  fetchSupportingDocs,
  fetchElectorates,
};
