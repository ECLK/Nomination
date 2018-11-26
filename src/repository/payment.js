import { DBError } from 'Errors';
import { DbConnection } from './dataSource';


const ALL_PAYMENTS_SELECT_QUERY = `SELECT * FROM payment`;
const PAYMENT_SELECT_QUERY_BY_NOMINATION_ID = `SELECT * FROM payment WHERE nomination_id = :id`;

const PAYMENT_STATUS_UPDATE_QUERY = `UPDATE payment SET status = :status WHERE nomination_id = :nomination_id`;
const PAYMENT_UPDATE_QUERY = `UPDATE payment 
SET 
  depositor = :depositor, deposit_amount = :deposit_amount, deposite_date = :deposite_date, uploaded_file_name = :uploaded_file_name
WHERE 
  nomination_id = :nomination_id`;

const PAYMENT_INSERT_QUERY = `INSERT INTO payment (id, depositor, deposit_amount, deposite_date, uploaded_file_name, nomination_id, status) VALUES (:id, :depositor, :deposit_amount, :deposite_date, :uploaded_file_name, :nomination_id, :status)`;



const getAll = () => {
  return DbConnection()
    .query(ALL_PAYMENTS_SELECT_QUERY,
      {
        type: DbConnection().QueryTypes.SELECT,
      }).catch( (error) => {
        throw new DBError(error);
      });
};

const getByNominationId = (nomination_id) => {
  const params = { id: nomination_id };
  return DbConnection()
    .query(PAYMENT_SELECT_QUERY_BY_NOMINATION_ID,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
        throw new DBError(error);
      });
};

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


const createPayment = (id, depositor, deposit_amount, deposite_date, uploaded_file_name, nomination_id, status) => {
  const params = { id: id, depositor: depositor, deposit_amount: deposit_amount, deposite_date: deposite_date, uploaded_file_name: uploaded_file_name, nomination_id: nomination_id, status: status};
  return DbConnection()
    .query(PAYMENT_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).catch((error) => {
        throw new DBError(error);
      });
};

const updatePaymentCommons = (depositor, deposit_amount, deposite_date, uploaded_file_name, nomination_id) => {
  const params = { depositor: depositor, deposit_amount: deposit_amount, deposite_date: deposite_date, uploaded_file_name: uploaded_file_name, nomination_id: nomination_id }
  return DbConnection()
    .query(PAYMENT_UPDATE_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.UPDATE,
      }).catch( (error) => {
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
  getByNominationId,
  updateStatusByNominationId,
  createPayment,
  updatePaymentCommons,
  // fetchPaymentById,
}