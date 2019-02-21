import { DBError } from 'Errors';
import { DbConnection } from './dataSource';



const ALL_PAYMENTS_SELECT_QUERY = `SELECT * FROM payment`;

const getAll = () => {
  return DbConnection()
    .query(ALL_PAYMENTS_SELECT_QUERY,
      {
        type: DbConnection().QueryTypes.SELECT,
      }).catch( (error) => {
        throw new DBError(error);
      });
};


const PAYMENT_SELECT_QUERY_BY_NOMINATION_ID = `SELECT 
                                              ID AS PAYMENT_ID, 
                                              DEPOSITOR AS PAYMENT_DEPOSITOR,
                                              DEPOSIT_DATE AS PAYMENT_DEPOSIT_DATE,
                                              AMOUNT AS PAYMENT_AMOUNT,
                                              FILE_PATH AS PAYMENT_FILE_PATH,
                                              STATUS  AS  PAYMENT_STATUS,
                                              NOMINATION_ID AS PAYMENT_NOMINATION_ID
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




const PAYMENT_INSERT_QUERY = `INSERT INTO PAYMENT 
  (ID, DEPOSITOR, DEPOSIT_DATE, AMOUNT, FILE_PATH, STATUS, NOMINATION_ID) 
VALUES 
  (:id, :depositor,:depositDate, :amount, :filePath, :status , :nominationId)`;

const createPayment = (paymentData) => {
  const params = paymentData;
  return DbConnection()
    .query(PAYMENT_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).then((results) => {
        return params ;
       }).catch((error) => {
         throw new DBError(error);
       });
};




const PAYMENT_UPDATE_QUERY = `UPDATE PAYMENT 
                              SET 
                              DEPOSITOR = :depositor, DEPOSIT_DATE = :depositDate, AMOUNT = :amount, FILE_PATH = :filePath
                              WHERE 
                              NOMINATION_ID = :nominationId`;

const updatePaymentCommons = (paymentData) => {
  const params = paymentData;
  return DbConnection()
    .query(PAYMENT_UPDATE_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.UPDATE,
      }).then((results) => {
        return params ;
       }).catch((error) => {
         throw new DBError(error);
       });
};


// const fetchPaymentById = (payment_id) => {
//   const params = { id: payment_id };
//   console.log(params);
//   return DbConnection()
//     .query(PAYMENT_SELECT_QUERY,
//       {
//         replacements: params,
//         type: DbConnection().QueryTypes.SELECT,
//       }).catch((error) => {
//         throw new DBError(error);
//     });
// };


export default {
  getAll,
  fetchPaymentsByNominationId,
  updateStatusByNominationId,
  createPayment,
  updatePaymentCommons,
  // fetchPaymentById,
}