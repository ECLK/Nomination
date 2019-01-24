import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
const uuidv4 = require('uuid/v4');

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
const GET_ELECTION_CONFIG=`SELECT * FROM election_module_config`;
const MODULE_INSERT_QUERY = `INSERT INTO election_config (election_module_id, election_module_name,authority,calculation_type,Deposite_payment,objection_availability,create_alliance,election_module_status) VALUES (:election_module_id, :election_module_name,:authority,: calculation_type, :Deposite_payment,: objection_availability,: create_alliance,: election_module_status)`;
const GET_ELECTION_CONFIG_BY_ID=`SELECT * FROM election_module_config WHERE id=:id`;
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
    const params =modules;
    return DbConnection()
        .query(MODULE_INSERT_QUERY,
            {   replacements: params,
                type: DbConnection().QueryTypes.INSERT,
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
const fetchElectionConfigById = (id) => {
    return DbConnection()
        .query(GET_ELECTION_CONFIG_BY_ID, {
            replacements: {id: id },
            type: DbConnection().QueryTypes.SELECT,
        }).catch( (error) => {
            throw new DBError(error);
        });
};


const INSERT_ELECTION_APPROVAL=`INSERT INTO election_approval (ID,STATUS,CREATED_BY,CREATED_AT,UPDATED_AT,ELECTION_ID) VALUES ( :ID, :STATUS, :CREATED_BY, :CREATED_AT, :UPDATED_AT, :ELECTION_ID)`;
const insertElectionApproval = (req) => {
    const params = {ID:uuidv4(), STATUS:req.body.status, CREATED_BY:req.body.created_by,CREATED_AT:req.body.created_date,UPDATED_AT:req.body.update_at,ELECTION_ID:req.body.election_id};
    return DbConnection()
        .query(INSERT_ELECTION_APPROVAL, {
            replacements: params,
            type: DbConnection().QueryTypes.INSERT,
        }).catch( (error) => {
            throw new DBError(error);
        });
};

export default {
	fetchElectionByIdWithTimelineData,
    createTest,
    fetchElectionConfig,
    fetchElectionConfigById,
    insertElectionApproval

}
