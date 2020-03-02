import { Payment,NominationPayment,AllPayments } from 'Models';
var joinjs = require('join-js').default;
import { List } from 'typed-immutable';
import _ from 'lodash';
import moment from 'moment';


const resultMaps = [
	{
		mapId: 'paymentMap',
		idProperty: 'ID',
		properties: ['DEPOSITOR', 'AMOUNT', 'DEPOSIT_DATE', 'FILE_PATH', 'STATUS', 'NOTE', 'NOMINATION_ID', 'CREATED_BY', 'CREATED_AT', 'UPDATED_AT','DIVISION_NAME','CANDIDATE_PAYMENT','NO_OF_CANDIDATE','TEAM_NAME']
	},
	{
		mapId: 'nominationPaymentMap',
		idProperty: 'ID',
		properties: ['DEPOSITOR', 'AMOUNT','SERIAL_NO', 'DEPOSIT_DATE', 'FILE_PATH', 'STATUS', 'NOMINATION_ID', 'CREATED_BY', 'CREATED_AT', 'UPDATED_AT','ELECTION_ID','TEAM_ID','NOTE','SDOC_ORIGINAL_NAME','SDOC_FILE_PATH','SDOC_ID']
	},
	{
		mapId: 'allPaymentMap',
		idProperty: 'id',
		properties: ['depositor', 'amount','serial', 'deposit_date', 'nomination_id','team','division']
	},
];

const mapToNominationPaymentModel = (payments) => {

	const mappedPayments = joinjs.map(payments, resultMaps, 'nominationPaymentMap', 'PAYMENT_');

	if (!_.isEmpty(mappedPayments)) {
		return NominationPayment({
			id: mappedPayments[0].ID,
			depositor: mappedPayments[0].DEPOSITOR,
			serialNo: mappedPayments[0].SERIAL_NO,
			depositAmount: mappedPayments[0].AMOUNT,
			amount: mappedPayments[0].AMOUNT,
			depositeDate: moment(new Date(mappedPayments[0].DEPOSIT_DATE)).format('YYYY-MM-DDTHH:mm'),
			uploadedFilePath: mappedPayments[0].FILE_PATH,
			status: mappedPayments[0].STATUS,
			nominationId: mappedPayments[0].NOMINATION_ID,
			createdBy: mappedPayments[0].CREATED_BY,
			createdAt: mappedPayments[0].CREATED_AT,
			updatedAt: mappedPayments[0].UPDATED_AT,
			election: mappedPayments[0].ELECTION_ID,
			team_id: mappedPayments[0].TEAM_ID,
			note:mappedPayments[0].NOTE,
			originalName:mappedPayments[0].SDOC_ORIGINAL_NAME,
			fileName:mappedPayments[0].SDOC_FILE_PATH,
			paymentSdocId:mappedPayments[0].SDOC_ID,
		});
	}
};

const mapToPaymentModel = (payments) => {
	const mappedPayments = joinjs.map(payments, resultMaps, 'paymentMap', 'PAYMENT_');

	if (!_.isEmpty(mappedPayments)) {
		return _.reduce(mappedPayments, (result, payment) => {
			return result.push({
				payment_id: payment.ID,
				depositor: payment.DEPOSITOR,
				deposit_amount: payment.AMOUNT,
				deposit_date: payment.DEPOSIT_DATE,
				uploadedFilePath: payment.FILE_PATH,
				payment_status: payment.STATUS,
				nomination_id: payment.NOMINATION_ID,
				createdBy: payment.CREATED_BY,
				createdAt: payment.CREATED_AT,
				updatedAt: payment.UPDATED_AT,
				division_name: payment.DIVISION_NAME,
				candidate_payment: payment.CANDIDATE_PAYMENT,
				no_of_candidate: payment.NO_OF_CANDIDATE,
				team_name: payment.TEAM_NAME,
				note:payment.NOTE
			});
		}, List(Payment)());
	}
}

const mapToAllPaymentModel = (payments) => {

	const mappedPayments = joinjs.map(payments, resultMaps, 'allPaymentMap', 'payment_');
	
	if (!_.isEmpty(mappedPayments)) {
		return _.reduce(mappedPayments, (result, payment) => {
			return result.push({
				payment_id: payment.id,
				depositor: payment.depositor,
				serial:payment.serial,
				deposit_amount: payment.amount,
				deposit_date: moment(new Date(payment.deposit_date)).format('YYYY-MM-DD hh:mm A'),
				nomination_id: payment.nomination_id,
				team_id: payment.team,
				division: payment.division,
				action:'true'
			});
		}, List(AllPayments)());
	}
}
export default {
	mapToPaymentModel,
	mapToNominationPaymentModel,
	mapToAllPaymentModel
};
