import _ from 'lodash';
import Payment from '../repository/Payment';
import {PaymentManager}  from 'Managers';


const updatePaymentByPaymentId = async (req) => {
  const payment_id = req.body.payment_id;
  const depositor = req.body.depositor;
  const deposit_amount = req.body.deposit_amount;
  const deposite_date = req.body.deposite_date;
  const uploaded_file_name = req.body.deposite_date;
  const nomination_id = req.body.nomination_id;
  const payment_status = req.body.payment_status;
  return Payment.createPayment( payment_id, depositor, deposit_amount, deposite_date, uploaded_file_name, nomination_id, payment_status);
};

const getPaymentByPaymentId = async (req) => {
  const uid = req.params.uid;
  return Payment.fetchPaymentById( uid );
};


export default {
  getPaymentByPaymentId,
  updatePaymentByPaymentId,
}