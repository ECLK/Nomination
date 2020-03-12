import { DBError } from 'Errors';
import { DbConnection } from './dataSource';


const ELECTION_WITH_TIMELINE_SELECT_QUERY = `SELECT * FROM (
											SELECT 
											e.ID AS election_id,
											e.NAME AS election_name,
											e.MODULE_ID AS election_module_id,
											et.NOMINATION_START AS election_nomination_start,
											et.NOMINATION_END AS election_nomination_end,
											et.OBJECTION_START AS election_objection_start,
											et.OBJECTION_END AS election_objection_end,
											et.PAYMENT_START AS election_payment_start,
											et.PAYMENT_END AS election_payment_end,
											et.APPROVAL_START AS election_approval_start,
											et.APPROVAL_END AS election_approval_end,
											ecd.VALUE AS config_value,
											ecd.ELECTION_MODULE_CONFIG_ID AS config_key,
											em.name AS  election_module_name,
											ea.STATUS AS election_approval_status,
											ea.REVIEW_NOTE AS election_reviewNote
											FROM ELECTION e
											LEFT JOIN ELECTION_TIMELINE et
											ON e.ID=et.ELECTION_ID
											LEFT JOIN ELECTION_MODULE em ON em.ID = e.MODULE_ID
											LEFT JOIN ELECTION_MODULE_CONFIG_DATA ecd ON em.ID = ecd.MODULE_ID
											LEFT JOIN ELECTION_APPROVAL ea ON e.ID = ea.ELECTION_ID
											WHERE e.ID = :id 
											GROUP BY ecd.ID) AS t1
											LEFT JOIN ELECTION_MODULE_CONFIG ec ON t1.config_key = ec.ID `;

const GET_ELECTION_CONFIG=`SELECT * FROM election_module_config`;

const MODULE_INSERT_QUERY = `INSERT INTO election_config (election_module_id, election_module_name,authority,calculation_type,Deposite_payment,objection_availability,create_alliance,election_module_status)
							 VALUES (:election_module_id, :election_module_name,:authority,: calculation_type, :Deposite_payment,: objection_availability,: create_alliance,: election_module_status)`;

const GET_ELECTION_CONFIG_BY_ID=`SELECT * FROM election_module_config WHERE id=:id`;

const ALL_ELECTIONS_SELECT_QUERY = `SELECT
									E.ID AS election_id,
									E.NAME AS election_name,
									E.MODULE_ID AS election_module_id,
									EA.STATUS AS election_status,
									E.CREATED_BY AS election_created_by,
									EA.UPDATED_AT AS election_last_modified
									FROM
									ELECTION E LEFT JOIN ELECTION_APPROVAL EA
									ON E.ID=EA.ELECTION_ID`;

const ELECTION_BY_STATUS_SELECT_QUERY = `SELECT
										E.ID AS election_id,
										E.NAME AS election_name,
										E.MODULE_ID AS election_module_id,
										EA.STATUS AS election_status,
										E.CREATED_BY AS election_created_by,
										EA.UPDATED_AT AS election_last_modified
										FROM
										ELECTION E LEFT JOIN ELECTION_APPROVAL EA
										ON E.ID=EA.ELECTION_ID
										WHERE EA.STATUS=:status OR EA.STATUS='APPROVE'  OR EA.STATUS='REJECT'`;
										// WHERE EA.STATUS=:status OR EA.STATUS='APPROVE' OR EA.STATUS='REJECT'`;

const ELECTION_BY_STATUS_NAME_SELECT_QUERY = `SELECT
										E.ID AS election_id,
										E.NAME AS election_name,
										E.MODULE_ID AS election_module_id,
										EA.STATUS AS election_status,
										E.CREATED_BY AS election_created_by,
										EA.UPDATED_AT AS election_last_modified
										FROM
										ELECTION E LEFT JOIN ELECTION_APPROVAL EA
										ON E.ID=EA.ELECTION_ID
										WHERE EA.STATUS=:status`;


// const LAST_ELECTION_ID_SELECT_QUERY = `SELECT ID
// 										FROM ELECTION
// 										WHERE CREATED_AT <= ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000)
// 										ORDER BY CREATED_AT DESC
// 										LIMIT 1;`;
const LAST_ELECTION_ID_SELECT_QUERY = `SELECT e.NAME AS name, et.ELECTION_ID AS id FROM ELECTION_TIMELINE  et LEFT JOIN 
										ELECTION e ON e.ID=et.ELECTION_ID
										WHERE et.NOMINATION_START<=ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000) 
										AND et.OBJECTION_END>=ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000)  `;

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

const createTest = (modules) => {
    const params =modules; //{ id: id, name : name};
    return DbConnection()
        .query(MODULE_INSERT_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.INSERT,
            }).catch((error) => {
            throw new DBError(error);
        });
};

const fetchElectionsByStatus = (status) => {
	const params ={status:status};
    return DbConnection()
        .query(ELECTION_BY_STATUS_SELECT_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.SELECT,
			}).then((Response) => {
				return Response;
			}).catch((error) => {
            throw new DBError(error);
        });
};

const fetchElectionsByStatusName = (status) => {
	const params ={status:status};
    return DbConnection()
        .query(ELECTION_BY_STATUS_NAME_SELECT_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.SELECT,
			}).then((Response) => {
				return Response;
			}).catch((error) => {
            throw new DBError(error);
        });
};

const fetchElectionConfig = () => {
    return DbConnection()
        .query(GET_ELECTION_CONFIG, {

            type: DbConnection().QueryTypes.SELECT,
		}).catch( (error) => {
            throw new DBError(error);
        });
};

const fetchAllElections = () => {
	return DbConnection()
		.query(ALL_ELECTIONS_SELECT_QUERY, {
			type: DbConnection().QueryTypes.SELECT,
		}).catch( (error) => {
			throw new DBError(error);
		});
}

//TODO: remove this after demo
const fetchLastElectionId = () => {
	return DbConnection()
		.query(LAST_ELECTION_ID_SELECT_QUERY, {
			type: DbConnection().QueryTypes.SELECT,
		}).catch( (error) => {
			throw new DBError(error);
		});
}



const fetchElectionConfigById = (id) => {
    return DbConnection()
        .query(GET_ELECTION_CONFIG_BY_ID, {
            replacements: {id: id },
            type: DbConnection().QueryTypes.SELECT,
        }).catch( (error) => {
            throw new DBError(error);
        });
};

export default {
	fetchElectionByIdWithTimelineData,
	createTest,
	fetchElectionConfig,
	fetchElectionConfigById,
	fetchAllElections,
	fetchLastElectionId,
	fetchElectionsByStatus,
	fetchElectionsByStatusName,
}
