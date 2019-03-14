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
	p.UPDATED_AT AS PAYMENT_UPDATED_AT
FROM 
	PAYMENT p
	LEFT JOIN NOMINATION n ON n.ID = p.NOMINATION_ID
WHERE 
	n.ELECTION_ID = :electionId`;
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


export default {
	fetchPaymentsByNominationId,
	updateStatusByNominationId,
	createPayment,
	updatePaymentCommons,
	fetchPaymentsByElectionId,
  sampleTransactionUpdateStatusByNominationId,
}
