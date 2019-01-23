import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';


const ALL_MODULE_SELECT_QUERY = `SELECT  
                                  EM.ID AS MODULE_ID,
                                  EM.NAME AS MODULE_NAME,
                                  EM.DIVISION_COMMON_NAME AS MODULE_DIVISION_COMMON_NAME,
                                  EM.CREATED_BY AS MODULE_CREATED_BY,
                                  EMA.STATUS AS MODULE_STATUS
                                  FROM ELECTION_MODULE EM LEFT JOIN ELECTION_MODULE_APPROVAL EMA
                                  ON EM.ID=EMA.MODULE_ID WHERE EMA.STATUS= :status`;
const MODULE_SELECT_QUERY = `SELECT 
                              ID AS MODULE_ID, 
                              NAME AS MODULE_NAME,
                              DIVISION_COMMON_NAME AS MODULE_DIVISION_COMMON_NAME,
                              CREATED_BY AS MODULE_CREATED_BY
                              FROM ELECTION_MODULE WHERE ID = :id`;
const MODULE_INSERT_QUERY = `INSERT INTO ELECTION_MODULE (ID, NAME) VALUES (:id, :name)`;
const MODULE_INSERT_BASE_QUERY = `INSERT INTO ELECTION_MODULE VALUES `;
const MODULE_COLUMN_ORDER = ['ID', 'NAME'];

const fetchModuleById = (moduleId) => {
  const params = { id: moduleId };
  return DbConnection()
    .query(MODULE_SELECT_QUERY,
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
const createModule = (id, name) => {
  const params = { id: id, name : name};
  return DbConnection()
    .query(MODULE_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).catch((error) => {
      throw new DBError(error);
    });
};

/**
 * Same can be used to insert single and multiple module too,
 * we should pass list of modules(module) to insert multiple modules
 * @param modules :Array of modules
 * @returns {Promise.<T>}
 */
const insertModules = (modules) => {
  return DbConnection()
  .query(formatQueryToBulkInsert(MODULE_INSERT_BASE_QUERY, modules),
    {
      replacements: formatDataToBulkInsert(modules, MODULE_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
    }).catch((error) => {
    throw new DBError(error);
  });
};

//get all election modules by status
const fetchModuleSByStatus = (status) => {
  const params = { status: status };
  return DbConnection()
    .query(ALL_MODULE_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
      throw new DBError(error);
    });
};


export default {
  fetchModuleById,
  createModule,
  insertModules,
  fetchModuleSByStatus
}