import { Payment }  from 'Models';
var joinjs = require('join-js').default;

const resultMaps = [
  {
    mapId: 'paymentMap',
    idProperty: 'ID',
    properties: ['DEPOSITOR', 'AMOUNT', 'DEPOSIT_DATE', 'FILE_PATH', 'STATUS', 'NOMINATION_ID']
  }
];

const mapToPaymentModel = (payments) => {
  const mappedPayments = joinjs.map(payments, resultMaps, 'paymentMap', 'PAYMENT_');
  
  if (mappedPayments.length>0){

   return Payment({
    id: mappedPayments[0].ID,
    depositor: mappedPayments[0].DEPOSITOR,
    depositAmount: mappedPayments[0].AMOUNT,
    depositeDate: mappedPayments[0].DEPOSIT_DATE,
    uploadedFilePath: mappedPayments[0].FILE_PATH,
    paymentStatus: mappedPayments[0].STATUS,
    nominationId: mappedPayments[0].NOMINATION_ID,
  });
  
}
};

export default {
    mapToPaymentModel,
};
