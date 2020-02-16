import { DBError } from 'Errors';
import _ from 'lodash';
import { DbConnection } from './dataSource';



const PAYMENT_SELECT_QUERY_BY_NOMINATION_ID = `SELECT
												P.ID AS PAYMENT_ID,
												P.DEPOSITOR AS PAYMENT_DEPOSITOR,
												P.SERIAL_NO AS PAYMENT_SERIAL_NO,
												P.DEPOSIT_DATE AS PAYMENT_DEPOSIT_DATE,
												P.AMOUNT AS PAYMENT_AMOUNT,
												P.FILE_PATH AS PAYMENT_FILE_PATH,
												P.STATUS  AS  PAYMENT_STATUS,
												P.NOMINATION_ID AS PAYMENT_NOMINATION_ID,
												P.CREATED_BY AS PAYMENT_CREATED_BY,
												P.CREATED_AT AS PAYMENT_CREATED_AT,
												P.UPDATED_AT AS PAYMENT_UPDATED_AT,
												E.ID AS PAYMENT_ELECTION_ID,
												N.TEAM_ID AS PAYMENT_TEAM_ID,
												P.NOTE AS PAYMENT_NOTE,
												PSD.ORIGINAL_NAME AS PAYMENT_SDOC_ORIGINAL_NAME,
												PSD.FILE_PATH AS PAYMENT_SDOC_FILE_PATH,
												PSD.ID AS PAYMENT_SDOC_ID
												FROM PAYMENT P LEFT JOIN  NOMINATION N ON P.NOMINATION_ID =N.ID
												LEFT JOIN ELECTION E ON E.ID=N.ELECTION_ID
												LEFT JOIN PAYMENT_SUPPORT_DOC PSD ON P.ID = PSD.PAYMENT_ID
												WHERE P.NOMINATION_ID= :id`;

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
  (ID, DEPOSITOR,SERIAL_NO, DEPOSIT_DATE, AMOUNT, FILE_PATH, STATUS, CREATED_BY, CREATED_AT, UPDATED_AT, NOMINATION_ID) 
VALUES 
  (:id, :depositor,:serialNo,:depositDate, :amount, :filePath, :status, :createdBy, :createdAt, :updatedAt , :nominationId)`;

const createPayment = (paymentData,transaction) => {
	const params = paymentData;
	return DbConnection()
		.query(PAYMENT_INSERT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.INSERT,
				transaction
			}).then((results) => {
				return params;
			}).catch((error) => {
				console.log(error);
				throw new DBError(error);
			});
};




const PAYMENT_UPDATE_QUERY = `UPDATE PAYMENT 
                              SET 
                              DEPOSITOR = :depositor, DEPOSIT_DATE = :depositDate, AMOUNT = :amount, FILE_PATH = :filePath, UPDATED_AT = :updatedAt, NOTE = :note, NOMINATION_ID = :nominationId
                              WHERE 
                              ID = :paymentId`;

const updatePaymentCommons = (paymentData,transaction) => {
	const params = paymentData;
	return DbConnection()
		.query(PAYMENT_UPDATE_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.UPDATE,
				transaction
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

const ALL_PAYMENTS_SELECT_QUERY = `SELECT P.ID AS payment_id, 
									P.DEPOSITOR AS payment_depositor ,
									P.SERIAL_NO AS payment_serial,
									P.DEPOSIT_DATE AS payment_deposit_date, 
									P.AMOUNT AS payment_amount,
									P.NOMINATION_ID AS payment_nomination_id,
									DC.NAME AS payment_division,
									N.TEAM_ID AS payment_team
									FROM PAYMENT P LEFT JOIN NOMINATION N ON P.NOMINATION_ID=N.ID
									LEFT JOIN DIVISION_CONFIG    DC  ON N.DIVISION_CONFIG_ID=DC.ID`;	
									
const PAYMENTS_SELECT_QUERY_BY_DIVISION = `SELECT P.ID AS payment_id, 
									P.DEPOSITOR AS payment_depositor ,
									P.SERIAL_NO AS payment_serial,
									P.DEPOSIT_DATE AS payment_deposit_date, 
									P.AMOUNT AS payment_amount,
									P.NOMINATION_ID AS payment_nomination_id,
									DC.NAME AS payment_division,
									N.TEAM_ID AS payment_team
									FROM PAYMENT P LEFT JOIN NOMINATION N ON P.NOMINATION_ID=N.ID
									LEFT JOIN DIVISION_CONFIG    DC  ON N.DIVISION_CONFIG_ID=DC.ID
									WHERE DC.ID=:divisionId`;	
									
const SERIAL_NO_BY_FORM_SELECT_QUERY = `SELECT * FROM PAYMENT_SERIAL WHERE FORM=:form`;

const PAYMENT_BY_SERIAL_NO_SELECT_QUERY = `SELECT * FROM PAYMENT WHERE SERIAL_NO=:serial`;

const SERIAL_NO_UPDATE_QUERY = `UPDATE PAYMENT_SERIAL SET NUM=NUM+1 WHERE FORM=:form`;

const PAYMENT_BY_NOMINATION_ID_SELECT_QUERY = `SELECT * FROM PAYMENT WHERE NOMINATION_ID = :nominationId`;

const PAYMENT_REVIEW_STATUS_UPDATE_QUERY = `UPDATE PAYMENT 
											SET 
											STATUS = :status
											WHERE 
											ID = :paymentId`;

const PAYMENT_REVIEW_NOTE_UPDATE_QUERY = `UPDATE PAYMENT 
											SET 
											NOTE = :note
											WHERE 
											ID = :paymentId`;

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

const getSerialNumber = (form,transaction) => {
	const params = { form: form };
	return DbConnection()
		.query(SERIAL_NO_BY_FORM_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
				transaction,
			}).then((results) => {
                return results;
            }).catch((error) => {
				throw new DBError(error);
			});
}

const getPaymentSerial = (serialNo,transaction) => {
	const params = { serial: serialNo };
	return DbConnection()
		.query(PAYMENT_BY_SERIAL_NO_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
				transaction,
			}).then((results) => {
                return results;
            }).catch((error) => {
				throw new DBError(error);
			});
}

const updateSerial = (form,transaction) => {
    const params = { 'form': form};
    return DbConnection()
        .query(SERIAL_NO_UPDATE_QUERY,
            {
                replacements: params,
				type: DbConnection().QueryTypes.UPDATE,
				transaction
            }).then((results) => {
                return params;
            }).catch((error) => {
                throw new DBError(error);
            });
};

const fetchAllPayments = (divisionId) => {
	const params = { 'divisionId': divisionId};
	if(params.divisionId === "all"){
		return DbConnection()
		.query(ALL_PAYMENTS_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT
			}).catch((error) => {
				throw new DBError(error);
			});
	}else{
		return DbConnection()
		.query(PAYMENTS_SELECT_QUERY_BY_DIVISION,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT
			}).catch((error) => {
				throw new DBError(error);
			});
	}
}

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


const fetchPaymentByPaymentId = (nominationId,transaction) => {
	const params = { nominationId: nominationId };
	return DbConnection()
	  .query(PAYMENT_BY_NOMINATION_ID_SELECT_QUERY,
		{
		  replacements: params,
				  type: DbConnection().QueryTypes.SELECT,
				  transaction
		}).then((results) => {
			if(_.isEmpty(results)){
				return true;
			}else{
				return false;
			}
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
	updatePaymentNote,
	fetchAllPayments,
	getSerialNumber,
	getPaymentSerial,
	updateSerial,
	fetchPaymentByPaymentId
}
