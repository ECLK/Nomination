import { DBError } from 'Errors';
import { DbConnection } from './dataSource';



const PAYMENT_SELECT_QUERY_BY_NOMINATION_ID = `SELECT 
                                              ID AS PAYMENT_ID, 
                                              DEPOSITOR AS PAYMENT_DEPOSITOR,
                                              DEPOSIT_DATE AS PAYMENT_DEPOSIT_DATE,
                                              AMOUNT AS PAYMENT_AMOUNT,
                                              FILE_PATH AS PAYMENT_FILE_PATH,
											  STATUS  AS  PAYMENT_STATUS,
											  NOMINATION_ID AS PAYMENT_NOMINATION_ID,
											  CREATED_BY AS PAYMENT_CREATED_BY,
											  CREATED_AT AS PAYMENT_CREATED_AT,
											  UPDATED_AT AS PAYMENT_UPDATED_AT
                                              FROM PAYMENT WHERE NOMINATION_ID= :id`;

const fetchPaymentsByNominationId = (nominationId) => {
	const params = { id: nominationId };
	return DbConnection()
		.query(PAYMENT_SELECT_QUERY_BY_NOMINATION_ID,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
				throw new DBError(error);
			});
};





const PAYMENT_STATUS_UPDATE_QUERY = `UPDATE payment SET status = :status WHERE nomination_id = :nomination_id`;

const updateStatusByNominationId = (nomination_id, status) => {
	const params = { nomination_id: nomination_id, status: status };
	console.log(params);
	return DbConnection()
		.query(PAYMENT_STATUS_UPDATE_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.UPDATE,
			}).catch((error) => {
				throw new DBError(error);
			});
};

/**
 * To be remove by @Udith
 * @param nomination_id
 * @param status
 * @returns {Promise.<T>}
 */
const sampleTransactionUpdateStatusByNominationId = (nomination_id, status, transaction) => {
  const params = { nomination_id: nomination_id, status: status };
  console.log(params);
  return DbConnection()
  .query(PAYMENT_STATUS_UPDATE_QUERY,
    {
      replacements: params,
      type: DbConnection().QueryTypes.UPDATE,
      transaction,
    }).catch((error) => {
    throw new DBError(error);
  });
};




const PAYMENT_INSERT_QUERY = `INSERT INTO PAYMENT 
  (ID, DEPOSITOR, DEPOSIT_DATE, AMOUNT, FILE_PATH, STATUS, CREATED_BY, CREATED_AT, UPDATED_AT, NOMINATION_ID) 
VALUES 
  (:id, :depositor,:depositDate, :amount, :filePath, :status, :createdBy, :createdAt, :updatedAt , :nominationId)`;

const createPayment = (paymentData) => {
	const params = paymentData;
	return DbConnection()
		.query(PAYMENT_INSERT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.INSERT,
			}).then((results) => {
				return params;
			}).catch((error) => {
				throw new DBError(error);
			});
};




const PAYMENT_UPDATE_QUERY = `UPDATE PAYMENT 
                              SET 
                              DEPOSITOR = :depositor, DEPOSIT_DATE = :depositDate, AMOUNT = :amount, FILE_PATH = :filePath, UPDATED_AT = :updatedAt
                              WHERE 
                              ID = :paymentId`;

const updatePaymentCommons = (paymentData) => {
	const params = paymentData;
	return DbConnection()
		.query(PAYMENT_UPDATE_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.UPDATE,
			}).then((results) => {
				return params;
			}).catch((error) => {
				throw new DBError(error);
			});
};


const PAYMENTS_BY_ELECTION_ID_SELECT_QUERY = `SELECT 
											p.ID AS PAYMENT_ID, 
											p.DEPOSITOR AS PAYMENT_DEPOSITOR,
											p.DEPOSIT_DATE AS PAYMENT_DEPOSIT_DATE,
											p.AMOUNT AS PAYMENT_AMOUNT,
											p.FILE_PATH AS PAYMENT_FILE_PATH,
											p.STATUS  AS  PAYMENT_STATUS,
											p.NOTE AS PAYMENT_NOTE,
											p.NOMINATION_ID AS PAYMENT_NOMINATION_ID,
											p.CREATED_BY AS PAYMENT_CREATED_BY,
											p.CREATED_AT AS PAYMENT_CREATED_AT,
											p.UPDATED_AT AS PAYMENT_UPDATED_AT,
											dc.NAME  AS PAYMENT_DIVISION_NAME,
											emcd.VALUE AS PAYMENT_CANDIDATE_PAYMENT,
											dc.NO_OF_CANDIDATES AS PAYMENT_NO_OF_CANDIDATE,
											tc.TEAM_NAME AS PAYMENT_TEAM_NAME
											FROM 
											PAYMENT p
											LEFT JOIN NOMINATION n ON n.ID = p.NOMINATION_ID
											LEFT JOIN DIVISION_CONFIG dc ON n.DIVISION_CONFIG_ID=dc.ID	
											LEFT JOIN ELECTION e ON n.ELECTION_ID=e.ID
											LEFT JOIN ELECTION_MODULE em ON e.MODULE_ID=em.ID
											LEFT JOIN ELECTION_MODULE_CONFIG_DATA emcd ON em.ID=emcd.MODULE_ID
											LEFT JOIN ELECTION_MODULE_CONFIG emc ON emc.ID=emcd.ELECTION_MODULE_CONFIG_ID
											LEFT JOIN TEAM_CONFIG tc ON tc.ID=n.TEAM_ID
											WHERE 
											n.ELECTION_ID = :electionId AND emc.KEY_NAME='candidate payment'`;
const fetchPaymentsByElectionId = (election_id) => {
	const params = { electionId: election_id };
	return DbConnection()
		.query(PAYMENTS_BY_ELECTION_ID_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT
			}).catch((error) => {
				throw new DBError(error);
			});
}

const PAYMENT_REVIEW_STATUS_UPDATE_QUERY = `UPDATE PAYMENT 
                              SET 
                              STATUS = :status
                              WHERE 
                              ID = :paymentId`;

const updatePaymentStatus = (paymentId,status) => {
    const params = { 'status': status, 'paymentId': paymentId};
    return DbConnection()
        .query(PAYMENT_REVIEW_STATUS_UPDATE_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.UPDATE,
            }).then((results) => {
                return params;
            }).catch((error) => {
                throw new DBError(error);
            });
};

const PAYMENT_REVIEW_NOTE_UPDATE_QUERY = `UPDATE PAYMENT 
                              SET 
                              NOTE = :note
                              WHERE 
                              ID = :paymentId`;

const updatePaymentNote = (paymentId,note) => {
    const params = { 'note': note, 'paymentId': paymentId};
    return DbConnection()
        .query(PAYMENT_REVIEW_NOTE_UPDATE_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.UPDATE,
            }).then((results) => {
                return params;
            }).catch((error) => {
                throw new DBError(error);
            });
};


export default {
	fetchPaymentsByNominationId,
	updateStatusByNominationId,
	createPayment,
	updatePaymentCommons,
	fetchPaymentsByElectionId,
  sampleTransactionUpdateStatusByNominationId,
  updatePaymentStatus,
  updatePaymentNote
}
