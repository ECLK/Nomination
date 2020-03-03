import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';
const uuidv4 = require('uuid/v4');



const ACTIVE_ELECTION_SELECT_QUERY = `SELECT ID AS activeElection_id, NAME AS activeElection_name, MODULE_ID as activeElection_module_id FROM ELECTION WHERE ID = :id`;
const ACTIVE_ELECTION_INSERT_QUERY = `INSERT INTO ELECTION (ID, NAME, CREATED_BY, CREATED_AT, UPDATED_AT, MODULE_ID) 
                                      VALUES (:id, :name,:created_by, :created_at, :updated_at, :module_id)`;
const ACTIVE_ELECTION_STATUS_INSERT_QUERY = `INSERT INTO ELECTION_APPROVAL (ID, STATUS, APPROVED_BY, APPROVED_AT, UPDATED_AT, ELECTION_ID) 
                                      VALUES (:id, :status,:created_by, :created_at, :updated_at, :electionId)`;
const TIME_LINE_COLUMN_ORDER = ['id','electionTimeLineConfigId', 'electionId', 'value'];
const TIME_LINE_INSERT_BASE_QUERY = `INSERT INTO ELECTION_TIMELINE_CONFIG_DATA (ID,ELECTION_TIMELINE_CONFIG_ID,ELECTION_ID, VALUE) VALUES `
const ELECTION_CONF_COLUMN_ORDER = ['id','electionConfigId', 'electionId', 'value'];
const ELECTION_CONF_INSERT_BASE_QUERY = `INSERT INTO ELECTION_CONFIG_DATA (ID,ELECTION_CONFIG_ID,ELECTION_ID, VALUE) VALUES `
const NOMINATON_ALLOW_INSERT_BASE_QUERY = `INSERT INTO NOMINATION (ID,STATUS,TEAM_ID, CREATED_BY,CREATED_AT,UPDATED_AT,ELECTION_ID,DIVISION_CONFIG_ID) VALUES `
const NOMINATON_ALLOW_COLUMN_ORDER = ['id','status', 'team_id', 'created_by','created_at','updated_at', 'election_id', 'division_id'];
const ACTIVE_ELECTION_UPDATE_QUERY = `UPDATE ELECTION 
                                SET 
                                NAME = :name,
                                MODULE_ID = :module_id,
                                UPDATED_AT = :updated_at,
                                CREATED_BY = :created_by
                                WHERE 
                                ID = :id`;
const ACTIVE_ELECTION_STATUS_UPDATE_QUERY = `UPDATE ELECTION_APPROVAL 
                                SET 
                                STATUS = :status,
                                UPDATED_AT = :updatedAt,
                                REVIEW_NOTE = :reviewNote
                                WHERE 
                                ELECTION_ID = :electionId`;
const ELECTION_TIMELINE_DELETE_QUERY = `DELETE FROM ELECTION_TIMELINE WHERE ELECTION_ID = :electionId`;
const ALLOW_NOMINATION_DELETE_QUERY = `DELETE FROM NOMINATION WHERE ELECTION_ID = :electionId`;
const ELECTION_DELETE_QUERY = `DELETE FROM ELECTION WHERE ID = :electionId`;
const ELECTION_APPROVAL_DELETE_QUERY = `DELETE FROM ELECTION_APPROVAL WHERE ELECTION_ID = :electionId`;

const ACTIVE_ELECTION_TIMELINE_INSERT_QUERY = `INSERT INTO ELECTION_TIMELINE (ID, NOMINATION_START, NOMINATION_END, OBJECTION_START, OBJECTION_END, PAYMENT_START, PAYMENT_END, APPROVAL_START, APPROVAL_END, ELECTION_ID) 
                                      VALUES (:id, :nomination_start,:nomination_end, :objection_start, :objection_end, :payment_start,:payment_end, :approval_start, :approval_end, :electionId)`;

const ALL_ELECTION_DATA_SELECT_QUERY = `SELECT 
                                        e.ID AS election_electionId,
                                        e.NAME AS election_name,
                                        e.MODULE_ID AS election_module_id,
                                        ea.STATUS AS election_status,
                                        e.CREATED_BY AS election_created_by,
                                        e.CREATED_AT AS election_created_at,
                                        e.UPDATED_AT AS election_updated_at,
                                        et.NOMINATION_START AS election_nominationStart,
                                        et.NOMINATION_END AS election_nominationEnd,
                                        et.OBJECTION_START AS election_objectionStart,
                                        et.OBJECTION_END AS election_objectionEnd,
                                        et.PAYMENT_START AS election_paymentStart,
                                        et.PAYMENT_END AS election_paymentEnd,
                                        et.APPROVAL_START AS election_approvalStart,
                                        et.APPROVAL_END AS election_approvalEnd,
                                        n.TEAM_ID AS election_team_id,
                                        n.DIVISION_CONFIG_ID AS election_division_id
                                        FROM ELECTION e 
                                        LEFT JOIN ELECTION_TIMELINE et ON et.ELECTION_ID=e.ID
                                        LEFT JOIN ELECTION_APPROVAL ea ON e.ID=ea.ELECTION_ID
                                        LEFT JOIN NOMINATION n ON e.ID=n.ELECTION_ID
                                        WHERE e.ID=:electionId`;
                                        
const ELECTORATES_BY_ELECTION_ID_SELECT_QUERY = `SELECT TEAM_ID AS election_team_id,DIVISION_CONFIG_ID AS election_division_id FROM NOMINATION WHERE ELECTION_ID=:id`;
const ELIGIBILITIES_BY_ELECTION_ID_SELECT_QUERY = `SELECT ecd.ELIGIBILITY_CONFIG_ID AS election_eligibility_config_id,   ec.DESCRIPTION AS election_description FROM ELECTION e LEFT JOIN ELECTION_MODULE  em ON em.ID=e.MODULE_ID LEFT JOIN ELIGIBILITY_CONFIG_DATA ecd ON em.ID = ecd.MODULE_ID 
LEFT JOIN ELIGIBILITY_CONFIG ec ON ec.ID = ecd.ELIGIBILITY_CONFIG_ID WHERE e.ID=:id`;



                                      
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
  console.log("data",data.nominationEnd);
  const params = {electionId:electionId};
try{

  const id = uuidv4();
  data = { id: id, nomination_start : data.nominationStart, nomination_end: data.nominationEnd, objection_start : data.objectionStart, objection_end: data.objectionEnd, payment_start : data.paymentStart, payment_end: data.paymentEnd, approval_start : data.approvalStart, approval_end: data.approvalEnd, electionId: electionId};
  console.log("data",data);
}catch(e){
  console.log(e);
}
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
  return DbConnection()
    .query(ACTIVE_ELECTION_TIMELINE_INSERT_QUERY,
      {
        replacements: data,
        type: DbConnection().QueryTypes.INSERT,
        transaction
      }).catch((error) => {
        console.log(error);
      throw new DBError(error);
    });
  
};

const deleteElectionTimeLine = async (electionId, transaction) => {
  const params = {electionId:electionId};

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
};

/**
 * save active election oending status on election approval table
 * @returns {Promise.<T>}
 */
const savePendingElectionStatus = async (pendingStatusData,transaction) => {
  console.log("pendingStatusData",pendingStatusData);
  const params = {electionId:pendingStatusData.electionId};
  await  DbConnection()
  .query(ELECTION_APPROVAL_DELETE_QUERY,
    {
      replacements: params,
      type: DbConnection().QueryTypes.DELETE,
      transaction
    }).catch((error) => {
      throw new DBError(error);
    });
	return DbConnection()
		.query(ACTIVE_ELECTION_STATUS_INSERT_QUERY,
			{
				replacements: pendingStatusData,
        type: DbConnection().QueryTypes.INSERT,
        transaction
			}).then((results) => {
				return pendingStatusData;
			}).catch((error) => {
        console.log("errrrrror",error);
				throw new DBError(error);
			});
};

const deleteElectionApproval = async (electionId,transaction) => {
  const params = {electionId:electionId};
  await  DbConnection()
  .query(ELECTION_APPROVAL_DELETE_QUERY,
    {
      replacements: params,
      type: DbConnection().QueryTypes.DELETE,
      transaction
    }).catch((error) => {
      throw new DBError(error);
    });
};

//undo if bullk timeline added
// const saveElectionTimeLine = async (electionId, data, transaction) => {
//   const params = {electionId:electionId};
//   console.log("params",params);
//   console.log("data",data);
//   // Transforming the object to match update query { }
//   data = data.map((record) => {
//     record.electionId = electionId;
//     record.id = uuidv4();
//     return record;
//   });
// await  DbConnection()
// .query(ELECTION_TIMELINE_DELETE_QUERY,
//   {
//     replacements: params,
//     type: DbConnection().QueryTypes.DELETE,
//     transaction
//   }).catch((error) => {
//     console.log(error);
//     throw new DBError(error);
//   });
// if( data instanceof Array && data.length > 0){
//   return DbConnection()
//   .query(formatQueryToBulkInsert(TIME_LINE_INSERT_BASE_QUERY, data),
//     {
//       replacements: formatDataToBulkInsert(data, TIME_LINE_COLUMN_ORDER),
//       type: DbConnection().QueryTypes.INSERT,
//       transaction,
//     }).catch((error) => {
//        throw new DBError(error);
//      });
//   }
// };

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
      console.log("error",error);
       throw new DBError(error);
     });
  }
};

const deleteAllowedNominations = async (electionId, transaction) => {
  const params = {electionId:electionId};
 
await  DbConnection()
.query(ALLOW_NOMINATION_DELETE_QUERY,
  {
    replacements: params,
    type: DbConnection().QueryTypes.DELETE,
    transaction
  }).catch((error) => {
    throw new DBError(error);
  });

};

const deleteElection = async (electionId, transaction) => {
  const params = {electionId:electionId};
 
await  DbConnection()
.query(ELECTION_DELETE_QUERY,
  {
    replacements: params,
    type: DbConnection().QueryTypes.DELETE,
    transaction
  }).catch((error) => {
    throw new DBError(error);
  });

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
const insertActiveElections = (activeElections,transaction) => {
  const params = activeElections;
	return DbConnection()
		.query(ACTIVE_ELECTION_INSERT_QUERY,
			{
				replacements: params,
        type: DbConnection().QueryTypes.INSERT,
        transaction
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
  console.log("params",params);
	return DbConnection()
		.query(ACTIVE_ELECTION_UPDATE_QUERY,
			{
				replacements: params,
        type: DbConnection().QueryTypes.UPDATE,
        transaction,
      }).then((result)=>{
        console.log("result",result);
      }).catch((error) => {
        console.log(error);
				throw new DBError(error);
			});
};

const updateElectionStatus = (params) => {
  console.log("params",params);
	return DbConnection()
		.query(ACTIVE_ELECTION_STATUS_UPDATE_QUERY,
			{
				replacements: params,
        type: DbConnection().QueryTypes.UPDATE,
      }).then((responce) => {
        return params;
      })
      .catch((error) => {
				throw new DBError(error);
			});
};

const fetchElectionDataByElectionId = (electionId) => {
	const params = { electionId: electionId };
	return DbConnection()
		.query(ALL_ELECTION_DATA_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
				throw new DBError(error);
			});
};

const fetchElectoratesByElectionId = (electionId) => {
	const params = { id: electionId };
	return DbConnection()
		.query(ELECTORATES_BY_ELECTION_ID_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch((error) => {
			throw new DBError(error);
		});
};

const fetchEligibilitiesByElectionId = (electionId) => {
	const params = { id: electionId };
	return DbConnection()
		.query(ELIGIBILITIES_BY_ELECTION_ID_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
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
  updateActiveElections,
  savePendingElectionStatus,
  updateElectionStatus,
  fetchElectionDataByElectionId,
  deleteElectionTimeLine,
  deleteElectionApproval,
  deleteAllowedNominations,
  deleteElection,
  fetchElectoratesByElectionId,
  fetchEligibilitiesByElectionId
}