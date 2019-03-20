import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';
const uuidv4 = require('uuid/v4');



const ACTIVE_ELECTION_SELECT_QUERY = `SELECT ID AS activeElection_id, NAME AS activeElection_name, MODULE_ID as activeElection_module_id FROM ELECTION WHERE ID = :id`;
const ACTIVE_ELECTION_INSERT_QUERY = `INSERT INTO ELECTION (ID, NAME, CREATED_BY, CREATED_AT, UPDATED_AT, MODULE_ID) 
                                      VALUES (:id, :name,:created_by, :created_at, :updated_at, :module_id)`;
const TIME_LINE_COLUMN_ORDER = ['id','electionTimeLineConfigId', 'electionId', 'value'];
const TIME_LINE_INSERT_BASE_QUERY = `INSERT INTO ELECTION_TIMELINE_CONFIG_DATA (ID,ELECTION_TIMELINE_CONFIG_ID,ELECTION_ID, VALUE) VALUES `
const ELECTION_CONF_COLUMN_ORDER = ['id','electionConfigId', 'electionId', 'value'];
const ELECTION_CONF_INSERT_BASE_QUERY = `INSERT INTO ELECTION_CONFIG_DATA (ID,ELECTION_CONFIG_ID,ELECTION_ID, VALUE) VALUES `
const NOMINATON_ALLOW_INSERT_BASE_QUERY = `INSERT INTO NOMINATION (ID,STATUS,TEAM_ID, CREATED_BY,CREATED_AT,UPDATED_AT,ELECTION_ID,DIVISION_CONFIG_ID) VALUES `
const NOMINATON_ALLOW_COLUMN_ORDER = ['id','status', 'team_id', 'created_by','created_at','updated_at', 'election_id', 'division_id'];
const ACTIVE_ELECTION_UPDATE_QUERY = `UPDATE ELECTION 
                                SET 
                                NAME = :name,
                                MODULE_ID = :moduleId,
                                UPDATED_AT = :updated_at
                                WHERE 
                                ID = :id`;
const ELECTION_TIMELINE_DELETE_QUERY = `DELETE FROM ELECTION_TIMELINE_CONFIG_DATA WHERE ELECTION_ID = :electionId`;
const ALLOW_NOMINATION_DELETE_QUERY = `DELETE FROM NOMINATION WHERE ELECTION_ID = :electionId`;


const fetchActiveElectionById = (activeElectionId) => {
  const params = { id: activeElectionId };
  return DbConnection()
    .query(ACTIVE_ELECTION_SELECT_QUERY,
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
const createActiveElection = (id, name) => {
  const params = { id: id, name : name, mudule_id: module_id};
  return DbConnection()
    .query(ACTIVE_ELECTION_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).catch((error) => {
      throw new DBError(error);
    });
};

/**
 * save active election transaction (first step)
 * save active election time line
 * @returns {Promise.<T>}
 */
const saveElectionTimeLine = async (electionId, data, transaction) => {
  const params = {electionId:electionId};
  console.log("params",params);
  console.log("data",data);
  // Transforming the object to match update query { }
  data = data.map((record) => {
    record.electionId = electionId;
    record.id = uuidv4();
    return record;
  });
await  DbConnection()
.query(ELECTION_TIMELINE_DELETE_QUERY,
  {
    replacements: params,
    type: DbConnection().QueryTypes.DELETE,
    transaction
  }).catch((error) => {
    console.log(error);
    throw new DBError(error);
  });
if( data instanceof Array && data.length > 0){
  return DbConnection()
  .query(formatQueryToBulkInsert(TIME_LINE_INSERT_BASE_QUERY, data),
    {
      replacements: formatDataToBulkInsert(data, TIME_LINE_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
      transaction,
    }).catch((error) => {
       throw new DBError(error);
     });
  }
};

/**
 * save active election transaction (third step)
 * save allow nomination
 * @returns {Promise.<T>}
 */
const saveAllowedNominations = async (electionId, data, transaction) => {
  const params = {electionId:electionId};
  // Transforming the object to match update query { }
  data = data.map((record) => {
    record.electionId = electionId;
    record.id = uuidv4();
    return record;
  });
await  DbConnection()
.query(ALLOW_NOMINATION_DELETE_QUERY,
  {
    replacements: params,
    type: DbConnection().QueryTypes.DELETE,
    transaction
  }).catch((error) => {
    throw new DBError(error);
  });
if( data instanceof Array && data.length > 0){
  return DbConnection()
  .query(formatQueryToBulkInsert(NOMINATON_ALLOW_INSERT_BASE_QUERY, data),
    {
      replacements: formatDataToBulkInsert(data, NOMINATON_ALLOW_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
      transaction,
    }).catch((error) => {
       throw new DBError(error);
     });
  }
};

/**
 * save active election transaction (second step)
 * save active election config
 * @returns {Promise.<T>}
 */
const saveActiveElectionConf = (config, transaction) => {
  return DbConnection()
  .query(formatQueryToBulkInsert(ELECTION_CONF_INSERT_BASE_QUERY, config),
    {
      replacements: formatDataToBulkInsert(config, ELECTION_CONF_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
      transaction,
    }).catch((error) => {
       throw new DBError(error);
     });
};

/**
 * Same can be used to insert single and multiple activeElection too,
 * we should pass list of activeElections(activeElection) to insert multiple activeElections
 * @param activeElections :Array of activeElections
 * @returns {Promise.<T>}
 */
const insertActiveElections = (activeElections) => {
  const params = activeElections;
  console.log("params",params);
	return DbConnection()
		.query(ACTIVE_ELECTION_INSERT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.INSERT,
			}).then((results) => {
				return params;
			}).catch((error) => {
				throw new DBError(error);
			});
};

/**
 * save active election transaction 
 * @returns {Promise.<T>}
 */
const updateActiveElections = (params,transaction) => {
	return DbConnection()
		.query(ACTIVE_ELECTION_UPDATE_QUERY,
			{
				replacements: params,
        type: DbConnection().QueryTypes.UPDATE,
        transaction,
			}).catch((error) => {
				throw new DBError(error);
			});
};


export default {
  fetchActiveElectionById,
  createActiveElection,
  insertActiveElections,
  saveElectionTimeLine,
  saveActiveElectionConf,
  saveAllowedNominations,
  updateActiveElections
}