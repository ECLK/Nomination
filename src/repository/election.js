import { DBError } from 'Errors';
import { DbConnection } from './dataSource';


const ELECTION_WITH_TIMELINE_SELECT_QUERY = `SELECT 
e.ID AS election_id,
e.NAME AS election_name,
e.MODULE_ID AS election_module_id,
etc.KEY_NAME AS timeline_key,
etcd.value AS timeline_value
FROM ELECTION e
	LEFT JOIN ELECTION_TIMELINE_CONFIG_DATA etcd ON e.ID = etcd.ELECTION_ID
	LEFT JOIN ELECTION_TIMELINE_CONFIG etc ON etc.ID = etcd.ELECTION_TIMELINE_CONFIG_ID
WHERE e.ID = :id`;

const fetchElectionByIdWithTimelineData = (electionId) => {

	const params = { id: electionId };
	return DbConnection()
		.query(ELECTION_WITH_TIMELINE_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch( (error) => {
			throw new DBError(error);
		});
};


const ELECTION_WITH_CONFIG_SELECT_QUERY = `SELECT 
e.ID AS election_id,
e.NAME AS election_name,
e.MODULE_ID AS election_module_id,
ec.KEY_NAME AS config_key,
ecd.value AS config_value
FROM ELECTION e
	LEFT JOIN ELECTION_CONFIG_DATA ecd ON e.ID = ecd.ELECTION_ID
	LEFT JOIN ELECTION_CONFIG ec ON ec.ID = ecd.ELECTION_CONFIG_ID
WHERE e.ID = :id`
const fetchElectionByIdWithConfig = (electionId) => {
	const params = { id: electionId };
	return DbConnection()
		.query(ELECTION_WITH_CONFIG_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch( (error) => {
			throw new DBError(error);
		});
}


const ELECTION_WITH_ALL_SELECT_QUERY = `SELECT 
e.ID AS election_id,
e.NAME AS election_name,
e.MODULE_ID AS election_module_id,
e.CREATED_BY AS election_created_by,
e.created_at AS election_created_at,
e.updated_at AS election_updated_at,
etc.KEY_NAME AS timeline_key,
etcd.VALUE AS timeline_value,
ec.KEY_NAME AS config_key,
ecd.VALUE AS config_value
FROM ELECTION e
	LEFT JOIN ELECTION_TIMELINE_CONFIG_DATA etcd ON e.ID = etcd.ELECTION_ID
	LEFT JOIN ELECTION_TIMELINE_CONFIG etc ON etc.ID = etcd.ELECTION_TIMELINE_CONFIG_ID
	LEFT JOIN ELECTION_CONFIG_DATA ecd ON e.ID = ecd.ELECTION_ID
	LEFT JOIN ELECTION_CONFIG ec ON ec.ID = ecd.ELECTION_CONFIG_ID
WHERE e.ID = :id`;

const fetchElectionWithAllData = (electionId) => {
	const params = { id: electionId };
	return DbConnection()
		.query(ELECTION_WITH_ALL_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch( (error) => {
			throw new DBError(error);
		});
};


const ELECTION_BY_ID_SELECT_QUERY = `SELECT 
e.ID AS election_id,
e.NAME AS election_name,
e.MODULE_ID AS election_module_id,
e.CREATED_BY AS election_created_by,
e.CREATED_AT AS election_created_at,
e.UPDATED_AT AS election_updated_at
FROM ELECTION e
WHERE e.ID = :id`;

const fetchElectionById = (electionId) => {
	const params = { id: electionId };
	return DbConnection()
		.query(ELECTION_BY_ID_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch( (error) => {
			throw new DBError(error);
		});
}



export default {
	fetchElectionByIdWithTimelineData,
	fetchElectionByIdWithConfig,
	fetchElectionWithAllData,
	fetchElectionById
}
