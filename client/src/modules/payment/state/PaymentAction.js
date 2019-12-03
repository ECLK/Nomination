import {loadElections} from "../../election/state/ElectionAction";
import {PAYMENT_LOAD_SUCCESS, PAYMENTS_LOADING, TOGGLE_PAYMENT,UPDATE_PAYMENT_NOTE,ON_PAYMENT_NOTES_CHANGE} from './PaymentTypes'
import {API_BASE_URL} from "../../../config.js";
import axios from "axios";
import { openSnackbar } from '../../election/state/ElectionAction';

function paymentsLoadSuccess(payments) {
    return {
        type: PAYMENT_LOAD_SUCCESS,
        payload: payments
    };
}

export function loadPayments(electionId) {
    return function (dispatch) {

        dispatch({
            type: PAYMENTS_LOADING,
            id: electionId
        });

        const response = axios
        .get(
          `${API_BASE_URL}/elections/${electionId}/payments`,
        )
        .then(response => {
           dispatch(paymentsLoadSuccess(response.data));
        }).catch(err => {
              console.log(err)
        });

    };
}

export const onChangeApprovalData = (paymentApprovals) => {
    return {
      type: TOGGLE_PAYMENT,
      payload: paymentApprovals,
    }
  };
  
  export function togglePayment(payment_status,team_name,division_name,status,paymentId) {
    return function (dispatch) {
      let paymentApprovals = {
        status: status
      };
      
      const response = axios
      .put(
        `${API_BASE_URL}/elections/${paymentId}/payments`,
            {...paymentApprovals}
      )
      .then(response => {
         dispatch(onChangeApprovalData(response.data));
         const payment_status_new = (payment_status==='PENDING') ? 'Payment Received for ' : 'Payment Pending for '
         dispatch(openSnackbar({ message:  payment_status_new + team_name +' - '+ division_name + ' Division' }));
      }).catch(err => {
            console.log(err)
      });
    };
  }

  export const savePaymentNote = (data) => {
    return {
      type: UPDATE_PAYMENT_NOTE,
      payload: data,
    }
  };
  
  export function SavePaymentNote(team_name,division_name,Id,note) {
    return function (dispatch) {
      let paymentNote = {
        note: note
      };
      
      const response = axios
      .put(
        `${API_BASE_URL}/elections/${Id}/paymentNote`,
            {...paymentNote}
      )
      .then(response => {
         dispatch(savePaymentNote(response.data));
         dispatch(openSnackbar({ message:  'Comment has been saved for ' + team_name +' - '+ division_name + ' Division' }));
         
      }).catch(err => {
            console.log(err);
            // dispatch(openSnackbar( {message:' Something went wrong'} ));
            
      });
    };
  }

  // export const ChangePaymentNote = (data) => {
  //   return {
  //     type: UPDATE_PAYMENT_NOTE,
  //     payload: data,
  //   }
  // };
  
  // export function handleNoteChange(Id,note) {
  //   return function (dispatch) {
  //     let paymentNote = {
  //       note: note
  //     };
      
  //        dispatch(ChangePaymentNote(paymentNote));
  
  //   };
  // }
  export const onChangePaymentNotes = (id, note) => {
    return {
      type: ON_PAYMENT_NOTES_CHANGE,
      payload: {id, note},
    }
  };
  

