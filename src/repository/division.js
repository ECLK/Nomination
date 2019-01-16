import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';


const DIVISION_SELECT_QUERY = `SELECT ID AS division_id, NAME AS division_name, CODE AS division_code, NO_OF_CANDIDATES AS division_no_of_candidates, MODULE_ID AS division_module_id FROM DIVISION_CONFIG WHERE ID = :id`;
const DIVISION_INSERT_QUERY = `INSERT INTO DIVISION_CONFIG (ID, NAME, CODE, NO_OF_CANDIDATES, MODULE_ID) VALUES (:id, :name, :code, :no_of_candidates, :module_id)`;
const DIVISION_INSERT_BASE_QUERY = `INSERT INTO DIVISION_CONFIG VALUES `;
const DIVISION_COLUMN_ORDER = ['ID', 'NAME'];

const fetchDivisionById = (divisionId) => {
  const params = { id: divisionId };
  return DbConnection()
    .query(DIVISION_SELECT_QUERY,
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
 * @param name : String
 * @returns {Promise.<T>}
 */
const createDivision = (id, name, code, no_of_candidates, module_id) => {
  const params = { id: id, name: name, code: code, no_of_candidates: no_of_candidates, module_id: module_id};
  return DbConnection()
    .query(DIVISION_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).catch((error) => {
      throw new DBError(error);
    });
};

/**
 * Same can be used to insert single and multiple division too,
 * we should pass list of divisions(division) to insert multiple divisions
 * @param divisions :Array of divisions
 * @returns {Promise.<T>}
 */
const insertDivisions = (divisions) => {
  return DbConnection()
  .query(formatQueryToBulkInsert(DIVISION_INSERT_BASE_QUERY, divisions),
    {
      replacements: formatDataToBulkInsert(divisions, DIVISION_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
    }).catch((error) => {
    throw new DBError(error);
  });
};


export default {
  fetchDivisionById,
  createDivision,
  insertDivisions,
}
