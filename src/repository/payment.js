import { DBError } from 'Errors';
import { DbConnection } from './dataSource';


const ALL_PAYMENTS_SELECT_QUERY = `SELECT * FROM payment`;
const ALL_PENDING_PAYMENTS_SELECT_QUERY = `SELECT 
                                            e.election_module_flag AS election_election_module_flag,
                                            e.id AS election_id,
                                            p.depositor AS  payment_depositor,
                                            p.deposit_amount AS  payment_deposit_amount,
                                            p.deposite_date AS  payment_deposite_date,
                                            p.uploaded_file_name AS payment_uploaded_file_name,
                                            p.nomination_id AS payment_nomination_id,
                                            em.division_name,
                                            em.nominated_candidate_count AS division_nominated_candidate_count
                                            FROM payment  p LEFT JOIN nomination n ON p.nomination_id=n.nomination_id 
                                            LEFT JOIN team t ON n.team_id=t.id 
                                            LEFT JOIN election_module_by_division em ON n.division_id=em.division_id 
                                            LEFT JOIN election e ON e.id=n.election_id
                                            WHERE  p.status='pending' AND n.election_id= :id`;

const ALL_PAID_PAYMENTS_SELECT_QUERY = `SELECT 
                                        e.election_module_flag AS election_election_module_flag,
                                        e.id AS election_id,
                                        p.depositor AS  payment_depositor,
                                        p.deposit_amount AS  payment_deposit_amount,
                                        p.deposite_date AS  payment_deposite_date,
                                        p.uploaded_file_name AS payment_uploaded_file_name,
                                        p.nomination_id AS payment_nomination_id,
                                        em.division_name,
                                        em.nominated_candidate_count AS division_nominated_candidate_count
                                        FROM payment  p LEFT JOIN nomination n ON p.nomination_id=n.nomination_id 
                                        LEFT JOIN team t ON n.team_id=t.id 
                                        LEFT JOIN election_module_by_division em ON n.division_id=em.division_id 
                                        LEFT JOIN election e ON e.id=n.election_id
                                        WHERE  p.status='paid' AND n.election_id= :id`;                                           
const PAYMENT_SELECT_QUERY_BY_NOMINATION_ID = `SELECT 
                                              ID AS PAYMENT_ID, 
                                              DEPOSITOR AS PAYMENT_DEPOSITOR,
                                              DEPOSIT_DATE AS PAYMENT_DEPOSIT_DATE,
                                              AMOUNT AS PAYMENT_AMOUNT,
                                              FILE_PATH AS PAYMENT_FILE_PATH,
                                              STATUS  AS  PAYMENT_STATUS,
                                              NOMINATION_ID AS PAYMENT_NOMINATION_ID
                                              FROM PAYMENT WHERE NOMINATION_ID= :id`;

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


const getPendingAll = (election_id) => {
  const params = { id: election_id };
  return DbConnection()
    .query(ALL_PENDING_PAYMENTS_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
        throw new DBError(error);
      });
};

const getPaidAll = (election_id) => {
  const params = { id: election_id };
  return DbConnection()
    .query(ALL_PAID_PAYMENTS_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
        throw new DBError(error);
      });
};

const getByNominationId = (nominationId) => {
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
  getPendingAll,
  getPaidAll,
  // fetchPaymentById,
}