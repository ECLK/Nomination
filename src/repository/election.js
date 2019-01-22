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


const ALL_ELECTIONS_SELECT_QUERY = `SELECT
	ID as election_id,
	NAME as election_name,
	CREATED_BY as election_created_by,
	CREATED_AT as election_created_at,
	UPDATED_AT as election_updated_at,
	MODULE_ID as election_module_id
FROM
	ELECTION`;

const fetchAllElections = () => {
	return DbConnection()
		.query(ALL_ELECTIONS_SELECT_QUERY, {
			type: DbConnection().QueryTypes.SELECT,
		}).catch( (error) => {
			throw new DBError(error);
		});
}



export default {
	fetchElectionByIdWithTimelineData,
	fetchAllElections,
}
