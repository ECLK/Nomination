import {DBError} from 'Errors';
import {DbConnection} from './dataSource';
import {formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';


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
const COLUMN_NAMES_CANDIDATE_CONFIG_QUERY = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'candidate_config'`;
const MODULE_COLUMN_ORDER = ['ID', 'NAME'];

const fetchModuleById = (moduleId) => {
    const params = {id: moduleId};
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
    const params = {id: id, name: name};
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
            })
        .then((result) => {
            return modules;
        }).catch((error) => {
            throw new DBError(error);
        });
};

//get all election modules by status
const fetchModuleSByStatus = (status) => {
    const params = {status: status};
    return DbConnection()
        .query(ALL_MODULE_SELECT_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.SELECT,
            }).catch((error) => {
            throw new DBError(error);
        });
};
const fetchColumnNamesFromCandidateConfig = () => {
    return DbConnection()
        .query(COLUMN_NAMES_CANDIDATE_CONFIG_QUERY,
            {
                type: DbConnection().QueryTypes.SELECT,
            }).catch((error) => {
            throw new DBError(error);
        });
};

const DIVISION_CONFIG_INSERT_BASE_QUERY = `INSERT INTO division_config VALUES `;
const DIVISION_CONFIG_COLUMN_ORDER = ['ID', 'NAME', 'CODE', 'NO_OF_CANDIDATES', 'MODULE_ID'];
const InsertTodivisionConfig = (list) => {

    return DbConnection()
        .query(formatQueryToBulkInsert(DIVISION_CONFIG_INSERT_BASE_QUERY, list),
            {
                replacements: formatDataToBulkInsert(list, DIVISION_CONFIG_COLUMN_ORDER),
                type: DbConnection().QueryTypes.INSERT,
            }).then((reult) => {
            return list;
        }).catch((error) => {
            throw new DBError(error);
        });
};


const Election_Module_UPDATE_QUERY = `UPDATE election_module SET DIVISION_COMMON_NAME = :name WHERE ID = :id`;
const UpdateElectionModule = (name, id) => {
    const params = {name: name, id: id};
    console.log(params);
    return DbConnection()
        .query(Election_Module_UPDATE_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.UPDATE,
            }).catch((error) => {
            throw new DBError(error);
        });
};
const ELECTION_MODULE_INSERT_QUERY = `INSERT INTO ELECTION_MODULE (ID, NAME) VALUES (:id, :name)`;
const insertToElectionModule = (id, name) => {
    const params = {id: id, name: name};
    return DbConnection()
        .query(ELECTION_MODULE_INSERT_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.INSERT,
            }).catch((error) => {
            throw new DBError(error);
        });
};
const ELECTION_MODULE_CONFIG_INSERT_BASE_QUERY = `INSERT INTO ELECTION_MODULE_CONFIG_DATA VALUES `;
const ELECTION_MODULE_CONFIG_COLUMN_ORDER = ['VALUE', 'ELECTION_MODULE_CONFIG_ID', 'MODULE_ID'];
const insertToElectionModuleConfigData = (modules) => {
    return DbConnection()
        .query(formatQueryToBulkInsert(ELECTION_MODULE_CONFIG_INSERT_BASE_QUERY, modules),
            {
                replacements: formatDataToBulkInsert(modules, ELECTION_MODULE_CONFIG_COLUMN_ORDER),
                type: DbConnection().QueryTypes.INSERT,
            }).then((results) => {
            return modules;
        }).catch((error) => {
            throw new DBError(error);
        });
};
const GET_ELECTION_CONFIG = `SELECT * FROM ELECTION_MODULE_CONFIG`;
const fetchElectionModuleConfig = () => {
    return DbConnection()
        .query(GET_ELECTION_CONFIG, {
            type: DbConnection().QueryTypes.SELECT,
        }).catch((error) => {
            throw new DBError(error);
        });
};
const FETCH_ELECTION_MODEL_BY_ID_QUERY = `SELECT NAME FROM ELECTION_MODULE WHERE ID= :ID`;
const fetchElectionModuleById = (ID) => {
    return DbConnection()
        .query(FETCH_ELECTION_MODEL_BY_ID_QUERY, {
            replacements: {ID: ID},
            type: DbConnection().QueryTypes.SELECT,
        }).catch((error) => {
            throw new DBError(error);
        });
};
const FETCH_ELECTION_CONFIG_BY_ID_QUERY = `SELECT  
ELECTION_MODULE_CONFIG_DATA.VALUE , ELECTION_MODULE_CONFIG.ID, ELECTION_MODULE_CONFIG.KEY_NAME
FROM ELECTION_MODULE_CONFIG_DATA 
INNER JOIN ELECTION_MODULE_CONFIG ON ELECTION_MODULE_CONFIG.ID=election_module_config_data.ELECTION_MODULE_CONFIG_ID
WHERE MODULE_ID=:MODULE_ID`;
const fetchElectionModuleConfigByModuleId = (MODULE_ID) => {
    return DbConnection()
        .query(FETCH_ELECTION_CONFIG_BY_ID_QUERY, {
            replacements: {MODULE_ID: MODULE_ID},
            type: DbConnection().QueryTypes.SELECT,
        }).catch((error) => {
            throw new DBError(error);
        });
};
export default {
    fetchModuleById,
    createModule,
    insertModules,
    fetchModuleSByStatus,
    fetchColumnNamesFromCandidateConfig,
    UpdateElectionModule,
    InsertTodivisionConfig,
    insertToElectionModule,
    insertToElectionModuleConfigData,
    fetchElectionModuleConfig,
    fetchElectionModuleById,
    fetchElectionModuleConfigByModuleId,

}