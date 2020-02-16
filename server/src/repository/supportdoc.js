import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert } from './sqlHelper';


const SUPPORT_DOC_BY_NOMINATION_SELECT_QUERY = `SELECT NS.ID AS SUPPORT_DOC_ID,
                                                NS.FILE_PATH AS SUPPORT_DOC_FILE_PATH,
												NS.SUPPORT_DOC_CONFIG_ID AS SUPPORT_DOC_SUPPORT_DOC_CONFIG_ID,
												NS.ORIGINAL_NAME AS SUPPORT_DOC_ORIGINAL_NAME,
                                                NS.NOMINATION_ID AS SUPPORT_DOC_NOMINATION_ID,
                                                SDC.KEY_NAME AS SUPPORT_DOC_KEY_NAME,
                                                NS.STATUS AS SUPPORT_DOC_STATUS
                                                FROM NOMINATION_SUPPORT_DOC NS LEFT JOIN SUPPORT_DOC_CONFIG SDC
                                                ON NS.SUPPORT_DOC_CONFIG_ID=SDC.ID
                                                LEFT JOIN SUPPORT_DOC_CONFIG_DATA SDCD ON SDCD.SUPPORT_DOC_CONFIG_ID=SDC.ID
												WHERE NS.NOMINATION_ID = :nominationId AND NS.STATUS<>"DELETE"`;
const SUPPORT_DOC_BY_CANDIDATE_SELECT_QUERY = `SELECT 
												SUPPORT_DOC_CONFIG_ID   AS SUPPORT_DOC_id,
												ORIGINAL_NAME AS SUPPORT_DOC_originalname,
												FILE_PATH AS SUPPORT_DOC_filename
												FROM CANDIDATE_SUPPORT_DOC WHERE CANDIDATE_ID=:candidateId`;
const SUPPORT_DOC_BY_MODULE_SELECT_QUERY = `SELECT 
                                            ID AS SUPPORT_DOC_ID,
                                            KEY_NAME AS SUPPORT_DOC_KEY_NAME,
                                            DESCRIPTION AS  SUPPORT_DOC_DESCRIPTION,
                                            DOC_CATEGORY AS SUPPORT_DOC_DOC_CATEGORY
                                            FROM SUPPORT_DOC_CONFIG  WHERE DOC_CATEGORY= :category`;

const SUPPORT_DOC_INSERT_BASE_QUERY = `INSERT INTO NOMINATION_SUPPORT_DOC (ID,ORIGINAL_NAME,FILE_PATH,SUPPORT_DOC_CONFIG_ID, NOMINATION_ID,STATUS) VALUES `
const SUPPORT_DOC_UPDATE_BASE_QUERY = `UPDATE NOMINATION_SUPPORT_DOC (ID,FILE_PATH,SUPPORT_DOC_CONFIG_DATA_ID, NOMINATION_ID) VALUES `

const SUPPORT_DOC_UPDATE_QUERY = `UPDATE NOMINATION_SUPPORT_DOC 
                                SET 
                                STATUS = "DELETE"
                                WHERE 
								NOMINATION_ID = :nominationId`;


const CANDIDATE_SUPPORT_DOC_UPDATE_QUERY = `UPDATE CANDIDATE_SUPPORT_DOC 
								SET 
								STATUS = "DELETE"
								WHERE 
								CANDIDATE_ID = :candidateId`;
								
const NOMINATION_STATUS_UPDATE_QUERY = `UPDATE NOMINATION 
                                SET 
                                STATUS = "SUBMIT"
                                WHERE 
                                ID = :nominationId`;

								
const SUPPORT_DOC_COLUMN_ORDER = ['id', 'originalName','filePath', 'supportDocConfDataId', 'nominationId', 'status'];

const CANDIDATE_SUPPORT_DOC_INSERT_BASE_QUERY = `INSERT INTO CANDIDATE_SUPPORT_DOC (ID,ORIGINAL_NAME,FILE_PATH,SUPPORT_DOC_CONFIG_ID, CANDIDATE_ID,NOMINATION_ID,STATUS) VALUES `
const CANDIDATE_SUPPORT_DOC_COLUMN_ORDER = ['id', 'originalName','filePath', 'supportDocConfDataId', 'candidateId', 'nominationId','status'];

const PAYMENT_SUPPORT_DOC_INSERT_QUERY = `INSERT INTO PAYMENT_SUPPORT_DOC (ID,ORIGINAL_NAME,FILE_PATH,PAYMENT_ID,STATUS) VALUES
										   (:id, :originalName,:filePath, :paymentId, :status)`;
										   
const PAYMENT_SUPPORT_DOC_STATUS_UPDATE_QUERY = `UPDATE PAYMENT_SUPPORT_DOC 
										   SET 
										   STATUS = "DELETE"
										   WHERE 
										   ID = :paymentSdocId`;

const PAYMENT_SUPPORT_DOC_SELECT_QUERY = `SELECT 
												ID AS SUPPORT_DOC_id,
												ORIGINAL_NAME  AS SUPPORT_DOC_originalname,
												FILE_PATH AS SUPPORT_DOC_filename
												FROM PAYMENT_SUPPORT_DOC WHERE PAYMENT_ID=:paymentId AND STATUS = 'NEW' LIMIT 1`;
										   
const getSupportDocByNomination = (nominationId) => {
	const params = { nominationId: nominationId };
	return DbConnection()
		.query(SUPPORT_DOC_BY_NOMINATION_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
				throw new DBError(error);
			});
}

const getSupportDocByCandidate = (candidateId) => {
	const params = { candidateId: candidateId };
	return DbConnection()
		.query(SUPPORT_DOC_BY_CANDIDATE_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
				throw new DBError(error);
			});
}

const fetchSupportDocByCategory = (category) => {
	const params = { category: category };
	return DbConnection()
		.query(SUPPORT_DOC_BY_MODULE_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
				throw new DBError(error);
			});
}

const saveSupportDocs = (supportDocsData,transaction) => {
	return DbConnection()
		.query(formatQueryToBulkInsert(SUPPORT_DOC_INSERT_BASE_QUERY, supportDocsData),
			{
				replacements: formatDataToBulkInsert(supportDocsData, SUPPORT_DOC_COLUMN_ORDER),
				type: DbConnection().QueryTypes.INSERT,
				transaction
			}).then((results) => {
				return supportDocsData;
			}).catch((error) => {
				throw new DBError(error);
			});
};

const saveCandidateSupportDocs = (supportDocsData,transaction) => {
	return DbConnection()
		.query(formatQueryToBulkInsert(CANDIDATE_SUPPORT_DOC_INSERT_BASE_QUERY, supportDocsData),
			{
				replacements: formatDataToBulkInsert(supportDocsData, CANDIDATE_SUPPORT_DOC_COLUMN_ORDER),
				type: DbConnection().QueryTypes.INSERT,
				transaction
			}).then((results) => {
				return supportDocsData;
			}).catch((error) => {
				console.log(error);
				throw new DBError(error);
			});
};

const updateSupportDocs = (nominationId,transaction) => {
	const params = { nominationId: nominationId };
	return DbConnection()
		.query(SUPPORT_DOC_UPDATE_QUERY,
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

const updateCandidateSupportingDocs = (candidateId,transaction) => {
	const params = { candidateId: candidateId };
	return DbConnection()
		.query(CANDIDATE_SUPPORT_DOC_UPDATE_QUERY,
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

const updateNominationStatus = (nominationId) => {
	const params = { nominationId: nominationId };
	return DbConnection()
		.query(NOMINATION_STATUS_UPDATE_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.UPDATE,
			}).then((results) => {
				return params;
			}).catch((error) => {
				throw new DBError(error);
			});
};


const getSupportDocByPayment = (paymentId) => {
	const params = { paymentId: paymentId };
	return DbConnection()
		.query(PAYMENT_SUPPORT_DOC_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
			throw new DBError(error);
		});
}




// ***************** SUPPORT_DOC_CONFIG_DATA ******************

const SUPPORT_DOC_CONFIG_DATA_INSERT_BASE_QUERY = 'INSERT INTO SUPPORT_DOC_CONFIG_DATA VALUES';
const SUPPORT_DOC_CONFIG_DATA_COLUMN_ORDER = ['SUPPORT_DOC_CONFIG_ID', 'MODULE_ID', 'SELECT_FLAG'];

const insertSupportDocConfigData = (configs) => {
	return DbConnection()
		.query(formatQueryToBulkInsert(SUPPORT_DOC_CONFIG_DATA_INSERT_BASE_QUERY, configs),
		{
			replacements: formatDataToBulkInsert(configs, SUPPORT_DOC_CONFIG_DATA_COLUMN_ORDER),
			type: DbConnection().QueryTypes.INSERT,
		}).then(() => {
			return configs;
		}).catch((error) => {
			throw new DBError(error);
		});
}

const savePaymentSupportDocs = (supportDocsData,transaction) => {
	const params = supportDocsData;
	return DbConnection()
		.query(PAYMENT_SUPPORT_DOC_INSERT_QUERY,
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

const updatePaymentSupportDocs = async (paymentSdocId,supportDocsData,transaction) => {
	const params = {paymentSdocId:paymentSdocId};
	if(paymentSdocId){
		await  DbConnection()
		.query(PAYMENT_SUPPORT_DOC_STATUS_UPDATE_QUERY,
		  {
			replacements: params,
			type: DbConnection().QueryTypes.UPDATE,
			transaction
		  }).catch((error) => {
			throw new DBError(error);
		  });
	}
	
	return DbConnection()
		.query(PAYMENT_SUPPORT_DOC_INSERT_QUERY,
			{
				replacements: supportDocsData,
				type: DbConnection().QueryTypes.INSERT,
				transaction
			}).then((results) => {
				return params;
			}).catch((error) => {
				console.log(error);
				throw new DBError(error);
			});
};


export default {
	getSupportDocByNomination,
	saveSupportDocs,
	updateSupportDocs,
	fetchSupportDocByCategory,
	insertSupportDocConfigData,
	updateNominationStatus,
	saveCandidateSupportDocs,
	updateCandidateSupportingDocs,
	getSupportDocByCandidate,
	savePaymentSupportDocs,
	updatePaymentSupportDocs,
	getSupportDocByPayment
}
