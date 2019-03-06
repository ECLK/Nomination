import { Payment } from 'Models';
var joinjs = require('join-js').default;
import { List } from 'typed-immutable';
import _ from 'lodash';

const resultMaps = [
	{
		mapId: 'paymentMap',
		idProperty: 'ID',
		properties: ['DEPOSITOR', 'AMOUNT', 'DEPOSIT_DATE', 'FILE_PATH', 'STATUS', 'NOTE', 'NOMINATION_ID', 'CREATED_BY', 'CREATED_AT', 'UPDATED_AT']
	}
];

const mapToPaymentModel = (payments) => {
	const mappedPayments = joinjs.map(payments, resultMaps, 'paymentMap', 'PAYMENT_');
	console.log(mappedPayments);

	if (!_.isEmpty(mappedPayments)) {
		return Payment({
			id: mappedPayments[0].ID,
			depositor: mappedPayments[0].DEPOSITOR,
			depositAmount: mappedPayments[0].AMOUNT,
			depositeDate: mappedPayments[0].DEPOSIT_DATE,
			uploadedFilePath: mappedPayments[0].FILE_PATH,
			status: mappedPayments[0].STATUS,
			nominationId: mappedPayments[0].NOMINATION_ID,
			createdBy: mappedPayments[0].CREATED_BY,
			createdAt: mappedPayments[0].CREATED_AT,
			updatedAt: mappedPayments[0].UPDATED_AT
		});
	}
};

// const mapToPaymentModel = (payments) => {
// 	const mappedPayments = joinjs.map(payments, resultMaps, 'paymentMap', 'PAYMENT_');
// 	if (!_.isEmpty(mappedPayments)) {
// 		return _.reduce(mappedPayments, (result, payment) => {
// 			return result.push({
// 				id: payment.ID,
// 				depositor: payment.DEPOSITOR,
// 				depositAmount: payment.AMOUNT,
// 				depositeDate: payment.DEPOSIT_DATE,
// 				uploadedFilePath: payment.FILE_PATH,
// 				status: payment.STATUS,
// 				nominationId: payment.NOMINATION_ID,
// 				createdBy: payment.CREATED_BY,
// 				createdAt: payment.CREATED_AT,
// 				updatedAt: payment.UPDATED_AT
// 			});
// 		}, List(Payment)());
// 	}
// }

export default {
	mapToPaymentModel
};
