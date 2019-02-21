import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';


const ACTIVE_ELECTION_SELECT_QUERY = `SELECT ID AS activeElection_id, NAME AS activeElection_name, MODULE_ID as activeElection_module_id FROM ELECTION WHERE ID = :id`;
const ACTIVE_ELECTION_INSERT_QUERY = `INSERT INTO ELECTION (ID, NAME, CREATED_BY, CREATED_AT, UPDATED_AT, MODULE_ID) 
                                      VALUES (:id, :name,:created_by, :created_at, :updated_at, :module_id)`;
const TIME_LINE_COLUMN_ORDER = ['id','electionTimeLineConfigId', 'electionId', 'value'];
const TIME_LINE_INSERT_BASE_QUERY = `INSERT INTO ELECTION_TIMELINE_CONFIG_DATA (ID,ELECTION_TIMELINE_CONFIG_ID,ELECTION_ID, VALUE) VALUES `
const ELECTION_CONF_COLUMN_ORDER = ['id','electionConfigId', 'electionId', 'value'];
const ELECTION_CONF_INSERT_BASE_QUERY = `INSERT INTO ELECTION_CONFIG_DATA (ID,ELECTION_CONFIG_ID,ELECTION_ID, VALUE) VALUES `
const NOMINATON_ALLOW_INSERT_BASE_QUERY = `INSERT INTO NOMINATION (ID,STATUS,TEAM_ID, CREATED_BY,CREATED_AT,UPDATED_AT,ELECTION_ID,DIVISION_CONFIG_ID) VALUES `
const NOMINATON_ALLOW_COLUMN_ORDER = ['id','status', 'team_id', 'created_by','created_at','updated_at', 'election_id', 'division_id'];



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

const saveTimeLine = (timeLine) => { 
  console.log("timeLine",timeLine);
  return DbConnection()
  .query(formatQueryToBulkInsert(TIME_LINE_INSERT_BASE_QUERY, timeLine),
    {
      replacements: formatDataToBulkInsert(timeLine, TIME_LINE_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
    }).then((results) => {
      return timeLine ;
     }).catch((error) => {
       throw new DBError(error);
     });
};

const saveActiveElectionConf = (config) => { 
  return DbConnection()
  .query(formatQueryToBulkInsert(ELECTION_CONF_INSERT_BASE_QUERY, config),
    {
      replacements: formatDataToBulkInsert(config, ELECTION_CONF_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
    }).then((results) => {
      return config ;
     }).catch((error) => {
       throw new DBError(error);
     });
};

const saveAllowedNominations = (nominationAllow) => { 
  console.log("nominationAllow",nominationAllow);
  return DbConnection()
  .query(formatQueryToBulkInsert(NOMINATON_ALLOW_INSERT_BASE_QUERY, nominationAllow),
    {
      replacements: formatDataToBulkInsert(nominationAllow, NOMINATON_ALLOW_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
    }).then((results) => {
      return nominationAllow ;
     }).catch((error) => {
       throw new DBError(error);
     });
};




export default {
  fetchActiveElectionById,
  createActiveElection,
  insertActiveElections,
  saveTimeLine,
  saveActiveElectionConf,
  saveAllowedNominations
}