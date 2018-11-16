import { DBError } from 'Errors';
import { DbConnection } from './dataSource';

const PAYMENT_SELECT_QUERY = `SELECT * FROM Payments WHERE payment_id = :id`;
const PAYMENT_INSERT_QUERY = `INSERT INTO Payments (payment_id, depositor, deposit_amount, deposite_date, uploaded_file_name, nomination_id, payment_status) VALUES (:payment_id, :depositor, :deposit_amount, :deposite_date, :uploaded_file_name, :nomination_id, :payment_status)`;

const fetchPaymentById = (payment_id) => {
  const params = { id: payment_id };
  return DbConnection()
    .query(PAYMENT_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
        throw new DBError(error);
    });
};

const createPayment = (payment_id, depositor, deposit_amount, deposite_date, uploaded_file_name, nomination_id, payment_status) => {
  const params = { payment_id: payment_id, depositor: depositor, deposit_amount: deposit_amount, deposite_date: deposite_date, uploaded_file_name: uploaded_file_name, nomination_id: nomination_id, payment_status: payment_status};
  // console.log(params);
  return DbConnection()
    .query(PAYMENT_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).catch((error) => {
        throw new DBError(error);
      });
};

export default {
  fetchPaymentById,
  createPayment,
}