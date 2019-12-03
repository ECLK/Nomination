import {PAYMENT_LOAD_SUCCESS, PAYMENTS_LOADING, TOGGLE_PAYMENT,UPDATE_PAYMENT_NOTE,ON_PAYMENT_NOTES_CHANGE} from "./PaymentTypes";
import update from 'immutability-helper';
import {REQUEST_STATE} from "../../../lib/request_redux_state";


const initialState = {
    payments: [],
    requestState: REQUEST_STATE.NOT_STARTED
};

function findPaymentIndex(payments, id) {
    return payments.findIndex(x => x.payment_id === id);
}

export default function reducer(state = initialState, action) {
    const allPayments = state.payments;

    switch (action.type) {
        case PAYMENTS_LOADING:
            return {
                ...state,
                requestState: REQUEST_STATE.LOADING
            };
        case PAYMENT_LOAD_SUCCESS:
            // Object.entries(action.payload).forEach(entry => {
            //     allPayments[entry[0]] = entry[1];
            // });
            return {
                ...state,
                payments: action.payload,
                requestState: REQUEST_STATE.SUCCESS
            };
            // return {
            //     ...state,
            //     requestState: REQUEST_STATE.SUCCESS
            // };
        case TOGGLE_PAYMENT:
            const {paymentId, status} = action.payload;
            const payments = allPayments;
            const i = findPaymentIndex(payments, paymentId);
            return {
                ...state,
                payments: update(payments, {[i]: {payment_status: {$set: status}}}),
            };
        case UPDATE_PAYMENT_NOTE:
            const { note} = action.payload;
            const j = findPaymentIndex(allPayments, action.payload.paymentId);
            return {
                ...state,
                payments: update(allPayments, {[j]: {note: {$set: note}}}),
            };
        case ON_PAYMENT_NOTES_CHANGE:
            const payment = state.payments;
            const index = findPaymentIndex(payment, action.payload.id);
            return {
              ...state,
              payments: update(payment, {[index]: { note: { $set: action.payload.note }}})
            };
    }
    return state;
}

