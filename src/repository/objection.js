import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';


const OBJECTION_SELECT_QUERY = `SELECT ID AS objection_id, DESCRIPTION AS objection_description, CREATE_DATE AS objection_created_date, CREATED_BY AS objection_created_by, CREATED_BY_TEAM_ID AS objection_created_by_team_id, NOMINATION_ID AS objection_nomination_id FROM OBJECTION WHERE ID = :id`;
const OBJECTION_INSERT_QUERY = `INSERT INTO OBJECTION (ID, DESCRIPTION, CREATE_DATE, CREATED_BY, CREATED_BY_TEAM_ID, NOMINATION_ID) VALUES (:id, :description, :created_date, :created_by, :created_by_team_id, :nomination_id)`;
const OBJECTION_INSERT_BASE_QUERY = `INSERT INTO OBJECTION VALUES `;
const OBJECTION_COLUMN_ORDER = ['ID', 'DESCRIPTION', 'CREATE_DATE', 'CREATED_BY', 'CREATED_BY_TEAM_ID', 'NOMINATION_ID'];

const OBJECTIONS_CREATED_BY_TEAM_SELECT_QUERY = `SELECT
    o.ID AS objection_id,
    o.DESCRIPTION AS objection_description,
    o.CREATED_AT AS objection_created_at,
    o.CREATED_BY AS objection_created_by,
    o.CREATED_BY_TEAM_ID AS objection_created_by_team_id,
    o.NOMINATION_ID AS objection_nomination_id
FROM
    OBJECTION o
    LEFT JOIN NOMINATION n ON n.ID = o.NOMINATION_ID
WHERE
    o.CREATED_BY_TEAM_ID = :team_id
    AND n.ELECTION_ID = :election_id`;

const fetchObjectionById = (objectionId) => {
  const params = { id: objectionId };
  return DbConnection()
    .query(OBJECTION_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
      throw new DBError(error);
    });
};

/**
 *
 * @param id : Bigint
 * @param description : String
 * @returns {Promise.<T>}
 */
const createObjection = (id, description) => {
  const params = { id: id, description : description};
  return DbConnection()
    .query(OBJECTION_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).catch((error) => {
      throw new DBError(error);
    });
};


/**
 * To be remove by @Udith
 * @param id
 * @param description
 * @returns {Promise.<T>}
 */
const sampleTransactionCreateObjection = (id, description, transaction) => {
  const params = { id: id, description : description};
  return DbConnection()
  .query(OBJECTION_INSERT_QUERY,
    {
      replacements: params,
      type: DbConnection().QueryTypes.INSERT,
      transaction,
    }).catch((error) => {
    throw new DBError(error);
  });
};



/**
 * Same can be used to insert single and multiple objection too,
 * we should pass list of objections(objection) to insert multiple objections
 * @param objections :Array of objections
 * @returns {Promise.<T>}
 */
const insertObjections = (objections) => {
  return DbConnection()
  .query(formatQueryToBulkInsert(OBJECTION_INSERT_BASE_QUERY, objections),
    {
      replacements: formatDataToBulkInsert(objections, OBJECTION_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
    }).catch((error) => {
    throw new DBError(error);
  });
};

const fetchObjectionCreatedByTeam = (election_id, team_id) => {
  const params = { team_id: team_id, election_id: election_id };
  return DbConnection()
      .query(OBJECTIONS_CREATED_BY_TEAM_SELECT_QUERY,
          {
              replacements: params,
              type: DbConnection().QueryTypes.SELECT,
          }).catch((error) => {
              throw new DBError(error);
          });
};



export default {
  fetchObjectionById,
  createObjection,
  insertObjections,
  fetchObjectionCreatedByTeam,
  sampleTransactionCreateObjection,
}

