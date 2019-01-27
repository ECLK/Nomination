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
etc.KEY_NAME AS config_key,
etcd.value AS config_value
FROM ELECTION e
	LEFT JOIN ELECTION_CONFIG_DATA etcd ON e.ID = etcd.ELECTION_ID
	LEFT JOIN ELECTION_CONFIG etc ON etc.ID = etcd.ELECTION_CONFIG_ID
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



export default {
	fetchElectionByIdWithTimelineData,
	fetchElectionByIdWithConfig,
}
