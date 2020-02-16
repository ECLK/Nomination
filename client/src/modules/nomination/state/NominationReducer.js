import update from 'immutability-helper';
import {
  GET_NOMINATIONS,
  POST_NOMINATION_PAYMENTS,
  PUT_NOMINATION_PAYMENTS,
  NOMINATIONS_LOADED,
  ON_NOMINATION_APPROVAL_CHANGE,
  GET_NOMINATION_PAYMENTS,
  HANDLE_CHANGE_PAYMENT,
  GET_NOMINATION_CANDIDATES,
  DELETE_NOMINATION_CANDIDATE,
  POST_NOMINATION_SUPPORT_DOC,
  APPROVED_ELECTIONS,
  PARTY_LIST_LOADED,
  GET_NOMINATION_LIST,
  RECEIVE_NOMINATION_STATUS,
  POST_CANDIDATE_SUPPORT_DOC,
  CANDIDATE_SUPPORT_DOC_LOADED,
  NOMINATION_PAYMENT_STATUS_LOADED,
  PAYMENT_LIST_LOADED,
  PAYMENT_SERIAL_NO_LOADED,
  GET_NOMINATION_LIST_FOR_PAYMENT,
  GET_NOMINATION_DATA,
  NOMINATION_PAYMENT_VALIDATION_LOADED,
  ORIGINAL_UPLOAD_PATH_LOADED,
  PARTY_LIST_BY_TEAM_TYPE_LOADED
} from "./NominationTypes";

const initialState = {
  //define the common states only
  all_nominations: [3],
  candidatePayments:[],
  nominations: [],
  getNominationPayments:[],
  paymentState:[],
  getNominationCandidates:[],
  getNominationCandidateDeleted:[],
  approveElections:[],
  nominationStatus:[],
  partyList:[],
  nominationList:[],
  nominationListForPayment:[],
  postCandidateSupportDocs:[],
  candidateSupportdocLoaded:[],
  nominationPaymentStatus:{},
  paymentList:[],
  nominationPaymentSerial:'',
  nominationData:[],
  nominationPaymentValidation:true,
  originalUploadPath:'',
  partyListByType:[]
};

const findIndex = (nominations, id) => {
  return nominations.findIndex(x => x.nomination_id === id);
};
function findApprovalIndex(nominations, id) {
  return nominations.findIndex(x => x.id === id);
}
function findNominationIndex(nomination, id) {
  return nomination.findIndex(x => x.id === id);
}
function findDivisionIndex(nominationList, id) {
  return nominationList.findIndex(x => x.id === id);
}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOMINATIONS:
      return {
        ...state,
        all_nominations: action.payload
      };
    case POST_NOMINATION_PAYMENTS:
      return {
        ...state,
        paymentList: [
          ...state.paymentList,
          action.payload
      ]
      };
    case PUT_NOMINATION_PAYMENTS:
      const PaymentIndex = state.paymentList.findIndex(x => x.payment_id === action.payload.payment_id);
      return {
        ...state,
        paymentList: update(state.paymentList, {[PaymentIndex]: {$set: action.payload}})
      }
    case NOMINATIONS_LOADED:
      return {
        ...state,
        nominations: action.payload
      };
    case ON_NOMINATION_APPROVAL_CHANGE:
      const nominations = state.nominations;
      const index = findApprovalIndex(nominations, action.payload.nominationId);
      return {
        ...state,
        nominations: update(nominations, {[index]: {approval_status: {$set: action.payload.status},reviewNote: {$set: action.payload.reviewNote}}})
      }
    case GET_NOMINATION_PAYMENTS:
      return {
        ...state,
        getNominationPayments: action.payload
      }; 
    case GET_NOMINATION_CANDIDATES:
      return {
        ...state,
        getNominationCandidates: action.payload
      };  
    case DELETE_NOMINATION_CANDIDATE:
      const toDelete = state.getNominationCandidates.findIndex(x => x.id === action.payload.candidateId);
      return {
        ...state,
        getNominationCandidates: update(state.getNominationCandidates, { $splice: [[toDelete, 1]] } )
      };   
    case HANDLE_CHANGE_PAYMENT:
      return {
        ...state,
        paymentState: action.payload
      };
    case POST_NOMINATION_SUPPORT_DOC:
      return {
        ...state,
        postNominationSupportDocs: action.payload
      };   
    case APPROVED_ELECTIONS:
      return {
        ...state,
        approveElections: action.payload
      }; 
    case PARTY_LIST_LOADED:
      return {
        ...state,
        partyList: action.payload
      }; 
    case PARTY_LIST_BY_TEAM_TYPE_LOADED:
      return {
        ...state,
        partyListByType: action.payload
      }; 
    case RECEIVE_NOMINATION_STATUS:
      const nominationList = state.nominationList;
      const index2 = findDivisionIndex(nominationList, action.payload.divisionId);
      const nomination = nominationList[index2].nomination;
      const index3 = findNominationIndex(nomination, action.payload.nominationId);
      return {
        ...state,
        nominationList: nominationList.map((nomination, nominationIndex) => {
          if (nominationIndex === index2) {
            return {
              ...nominationList[index2],
              nomination: update(nominationList[index2].nomination, {[index3]: {status: {$set: 'SUBMIT'}}})
            }
          } else {
            return nomination
          }
        })
      } 
    case GET_NOMINATION_LIST:
      return {
        ...state,
        nominationList: action.payload
      };  
    case GET_NOMINATION_LIST_FOR_PAYMENT:
      return {
        ...state,
        nominationListForPayment: action.payload
      };  
    case POST_CANDIDATE_SUPPORT_DOC:
      return {
        ...state,
        postCandidateSupportDocs: action.payload
      }; 
    case CANDIDATE_SUPPORT_DOC_LOADED:
      return {
        ...state,
        candidateSupportdocLoaded: action.payload
      }; 
    case NOMINATION_PAYMENT_STATUS_LOADED:
      return {
        ...state,
        nominationPaymentStatus: action.payload
      };
    case PAYMENT_LIST_LOADED:
      return {
        ...state,
        paymentList: action.payload
      }; 
    case PAYMENT_SERIAL_NO_LOADED:
      return {
        ...state,
        nominationPaymentSerial: action.payload
      }; 
    case GET_NOMINATION_DATA:
      return {
        ...state,
        nominationData: action.payload
      }; 
    case NOMINATION_PAYMENT_VALIDATION_LOADED:
      return {
        ...state,
        nominationPaymentValidation: action.payload
      }; 
    case ORIGINAL_UPLOAD_PATH_LOADED:
        return {
          ...state,
          originalUploadPath: action.payload
        }; 
      
  }
  return state;
}

