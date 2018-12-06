import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert } from './sqlHelper';

const ELECTION_SELECT_QUERY = `SELECT 
ID AS election_id,
NAME AS election_name,
MODULE_ID AS election_module_id
FROM ELECTION
WHERE ID = :id`;

const getbyId = (electionId) => {
	const params = { id: electionId };
	return DbConnection()
		.query(ELECTION_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch((error) => {
			throw new DBError(error);
		});
};

export default {
	getbyId,
}