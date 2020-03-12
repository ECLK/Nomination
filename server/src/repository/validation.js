import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { DbConnectionTeam } from './teamDataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';
const uuidv4 = require('uuid/v4');


const ELECTION_NAME_VALIDATE_QUERY = `SELECT COUNT( * ) AS COUNT FROM ELECTION WHERE NAME = :electionName `;
const PARTY_NAME_VALIDATE_QUERY = `SELECT COUNT( * ) AS COUNT FROM TEAM WHERE PARTY_NAME = :partyName `;

const TEMPLATE_NAME_VALIDATE_QUERY = `SELECT COUNT( * ) AS COUNT FROM ELECTION_MODULE WHERE NAME = :templateName `;
const ELECTION_STATUS_VALIDATE_QUERY = `SELECT COUNT(*) AS COUNT FROM PAYMENT P LEFT JOIN NOMINATION N ON P.NOMINATION_ID = N.ID
                                        WHERE N.ELECTION_ID = :electionId`;
const TEMPLATE_STATUS_VALIDATE_QUERY = `SELECT COUNT(*) AS COUNT FROM ELECTION WHERE MODULE_ID = :moduleId`;
const NOMINATION_STATUS_VALIDATE_QUERY = `SELECT COUNT(*) AS COUNT FROM NOMINATION_APPROVAL WHERE NOMINATION_ID = :nominationId`;

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
const fetchPartyCount = (partyName) => {
    const params = {partyName: partyName};
    return DbConnectionTeam()
        .query(PARTY_NAME_VALIDATE_QUERY,
            {
                replacements: params,
                type: DbConnectionTeam().QueryTypes.SELECT,
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
const fetchPaymentsByElectionId = (electionId) => {
const params = {electionId: electionId};
return DbConnection()
    .query(ELECTION_STATUS_VALIDATE_QUERY,
        {
            replacements: params,
            type: DbConnection().QueryTypes.SELECT,
        }).catch((error) => {
            console.log(error);
        throw new DBError(error);
    });
};

const fetchTemplatesByModuleId = (moduleId) => {
    const params = {moduleId: moduleId};
    return DbConnection()
        .query(TEMPLATE_STATUS_VALIDATE_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.SELECT,
            }).catch((error) => {
                console.log(error);
            throw new DBError(error);
        });
    };

const fetchNominationsByNominationId = (nominationId) => {
    const params = {nominationId: nominationId};
    return DbConnection()
        .query(NOMINATION_STATUS_VALIDATE_QUERY,
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
    fetchTemplateCount,
    fetchPaymentsByElectionId,
    fetchTemplatesByModuleId,
    fetchNominationsByNominationId,
    fetchPartyCount
};
