import { Payment }  from 'Models';
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'paymentMap',
    idProperty: 'payment_id',
    properties: ['payment_id', 'depositor', 'deposit_amount', 'deposite_date', 'uploaded_file_name', 'nomination_id', 'payment_status']
  }
];


const mapToPaymentModel = (payment) => {
  const mappedPayments = joinjs.map(payment, resultMaps, 'paymentMap', 'payment_');

  //just an example how to convert row data object to Model
  if (mappedPayments.length>0){
    const paymentModel = Payment({
        payment_id: mappedPayments[0].payment_id,
        depositor: mappedPayments[0].depositor,
        deposit_amount: mappedPayments[0].deposit_amount,
        deposite_date: mappedPayments[0].deposite_date,
        uploaded_file_name: mappedPayments[0].uploaded_file_name,
        nomination_id: mappedPayments[0].nomination_id,
        payment_status: mappedPayments[0].payment_status,
    });
    console.log("paymentModel.payment_id >>>>>>>", paymentModel.get("payment_id"));
  }

  return mappedPayments;
};

export default {
    mapToPaymentModel,
};
