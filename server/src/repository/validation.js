import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';
const uuidv4 = require('uuid/v4');


const ELECTION_NAME_VALIDATE_QUERY = `SELECT COUNT( * ) AS COUNT FROM ELECTION WHERE NAME = :electionName `;
const TEMPLATE_NAME_VALIDATE_QUERY = `SELECT COUNT( * ) AS COUNT FROM ELECTION_MODULE WHERE NAME = :templateName `;


const fetchElectionCount = (electionName) => {
  const params = {electionName: electionName};
  return DbConnection()
      .query(ELECTION_NAME_VALIDATE_QUERY,
          {
              replacements: params,
              type: DbConnection().QueryTypes.SELECT,
          }).catch((error) => {
              console.log(error);
          throw new DBError(error);
      });
};
const fetchTemplateCount = (templateName) => {
    const params = {templateName: templateName};
    return DbConnection()
        .query(TEMPLATE_NAME_VALIDATE_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.SELECT,
            }).catch((error) => {
                console.log(error);
            throw new DBError(error);
        });
  };


export default {
    fetchElectionCount,
    fetchTemplateCount
};
