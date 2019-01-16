import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';


const OBJECTION_SELECT_QUERY = `SELECT ID AS objection_id, DESCRIPTION AS objection_description, CREATE_DATE AS objection_created_date, CREATED_BY AS objection_created_by, CREATED_BY_TEAM_ID AS objection_created_by_team_id, NOMINATION_ID AS objection_nomination_id FROM OBJECTION WHERE ID = :id`;
const OBJECTION_INSERT_QUERY = `INSERT INTO OBJECTION (ID, DESCRIPTION, CREATE_DATE, CREATED_BY, CREATED_BY_TEAM_ID, NOMINATION_ID) VALUES (:id, :description, :created_date, :created_by, :created_by_team_id, :nomination_id)`;
const OBJECTION_INSERT_BASE_QUERY = `INSERT INTO OBJECTION VALUES `;
const OBJECTION_COLUMN_ORDER = ['ID', 'DESCRIPTION', 'CREATE_DATE', 'CREATED_BY', 'CREATED_BY_TEAM_ID', 'NOMINATION_ID'];

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


export default {
  fetchObjectionById,
  createObjection,
  insertObjections,
}

