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


const ELECTIONS_BY_STATUS_SELECT_QUERY = `SELECT 
	e.ID AS election_id,
	e.NAME AS election_name,
	e.CREATED_BY AS election_created_by,
	e.CREATED_AT AS election_created_at,
	e.UPDATED_AT AS election_updated_at,
	e.MODULE_ID AS election_module_id,
	new_t.STATUS AS election_status
FROM ELECTION_APPROVAL t 
	INNER JOIN 
	(
		SELECT 
		a.*, MAX( b.APPROVED_AT ) AS max_appr 
		FROM ELECTION_APPROVAL a 
		INNER JOIN ELECTION_APPROVAL b ON a.ELECTION_ID = b.ELECTION_ID GROUP BY a.ELECTION_ID, a.STATUS
	) new_t ON t.ELECTION_ID = new_t.ELECTION_ID AND t.APPROVED_AT = new_t.max_appr AND new_t.STATUS = "PENDING" AND new_t.APPROVED_AT=new_t.max_appr
	INNER JOIN ELECTION e ON e.ID = new_t.ELECTION_ID`;

const fetchElectionsByStatus = (status) => {
	const params = { status: status };
	return DbConnection()
		.query(ELECTIONS_BY_STATUS_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch( (error) => {
			throw new DBError(error);
		});
}



export default {
	fetchElectionByIdWithTimelineData,
	fetchAllElections,
	fetchElectionsByStatus,
}
