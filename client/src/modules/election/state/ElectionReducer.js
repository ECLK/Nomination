import {
    ELECTION_LOAD_SUCCESS,
    ELECTIONS_LOADING,
    POST_ACTIVE_ELECTION_DATA,
    POST_ELECTION,
    GET_ELECTION_MODULE,
    POST_CALL_ELECTION,
    POST_CALL_ELECTION_DATA,
    SET_CALL_ELECTION_DATA,
    ELECTION_REVIEW_DATA,
    ON_ELECTION_APPROVAL_CHANGE,
    SNACK_BAR_MESSAGE_LOADED,
    GET_ALL_ELECTIONS,
    RECEIVE_PENDING_ELECTION,
    RECEIVE_APPROVED_ELECTION,
    GET_CALL_ELECTION_DATA,
    HANDLE_CHANGE_CALL_ELECTION,
    EDIT_CALL_ELECTION_DATA,
    DELETE_CALL_ELECTION_DATA,
    GET_CALL_ELECTION_TIME_LINE_DATA,
    GET_ACTIVE_ELECTIONS,
SET_ELECTORATES_DIVISIONS,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    ELECTION_ELECTORATES_REVIEW_DATA,
    ELECTION_ELIGIBILITY_REVIEW_DATA                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
} from "./ElectionTypes";
import { REQUEST_STATE } from "../../../lib/request_redux_state";
import update from 'immutability-helper';

const initialState = { 
    //define the common states only
    nominationStart: '2017-05-24T10:30',
    nominationEnd: '2017-05-24T10:30',
    objectionStart: '2017-05-24T10:30',
    objectionEnd: '2017-05-24T10:30',
    depositAmount: 'Amount',
    WeightagePrefarence: '%',
    WeightageVote: '%',
    rowData: [],
    requestState: REQUEST_STATE.NOT_STARTED,
    elections: [],
    electionData: [],
    allElectionModules: [],
    CallElectionData: {
        "name":'',
        "module_id":'',
        "status":'',
        "created_by":"",
        "created_at":'',
        "updated_at":'',
        "timeLineData": 
            {
                nominationStart: '',
                nominationEnd: '',
                objectionStart: '',
                objectionEnd: '',
                electionId: '',
            },
        "rowData":[]
    },
    PostedCallElection: [],
    PostedCallElectionData: [],
    ElectionReviewData:[],
    snackBarMsg:[],
    AllElections:[],
    ElectionTimeLineData:[],
    allActiveElections:[],
    columnHeaders:[
        {id:'',name:''}
    ],
    electionElectorates: [],
    electionEligibilities: [],
};

const findIndex = (AllElections, id) => {
    return AllElections.findIndex(x => x.id === id);
  };
  
  function findApprovalIndex(AllElections, id) {
    return AllElections.findIndex(x => x.id === id);
  }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ELECTIONS_LOADING:
            return {
                ...state,
                requestState: REQUEST_STATE.LOADING
            };
        case ELECTION_LOAD_SUCCESS:
            return {
                ...state,
                elections: action.payload,
                requestState: REQUEST_STATE.SUCCESS
            };
        case POST_ELECTION:
            return {
                ...state,
                electionData: action.payload
            };
        case GET_ELECTION_MODULE:
            return {
                ...state,
                allElectionModules: action.payload
            };
        case SET_CALL_ELECTION_DATA://set election data to the state
            return {
                ...state,
                CallElectionData: action.payload
            };
        case POST_CALL_ELECTION://save on ELECTION table
            return {
                ...state,
                PostedCallElection: action.payload
            };
        case POST_CALL_ELECTION_DATA://save timeline, electionConfig, allow nominaton
            return {
                ...state,
                PostedCallElectionData: action.payload
            };
        case EDIT_CALL_ELECTION_DATA://save timeline, electionConfig, allow nominaton
        const AllElectionsPrev = state.AllElections;
        const i = findApprovalIndex(AllElectionsPrev, action.payload.electionId);
        return {
            ...state,
            AllElections: update(state.AllElections, {[i]: {status: {$set: action.payload.status}}})
        }; 
        case ELECTION_REVIEW_DATA://save timeline, electionConfig, allow nominaton
            return {
                ...state,
                ElectionReviewData: action.payload
            };
        case ON_ELECTION_APPROVAL_CHANGE:
        const ElectionReviewData = state.ElectionReviewData;
            return {
              ...state,
              ElectionReviewData: update(ElectionReviewData, {approval_status: {$set: action.payload.status}})
            };
        case SNACK_BAR_MESSAGE_LOADED://save timeline, electionConfig, allow nominaton
            return {
                ...state,
                snackBarMsg: action.payload
            };
        case GET_ALL_ELECTIONS:
            return {
                ...state,
                AllElections: action.payload
            };
        case RECEIVE_PENDING_ELECTION:
            return {
                ...state,
                AllElections: [
                    ...state.AllElections,
                    action.payload
                ]
            };    
        case RECEIVE_APPROVED_ELECTION:
            const AllElections = state.AllElections;
            const index = findApprovalIndex(AllElections, action.payload.electionId);
            return {
                ...state,
                AllElections: update(AllElections, {[index]: {status: {$set: action.payload.status}}})
            }; 
        case GET_CALL_ELECTION_DATA://set election data to the state
            return {
                ...state,
                CallElectionData: action.payload
            };
        case HANDLE_CHANGE_CALL_ELECTION://set election data to the state
            return {
                ...state,
                CallElectionData: action.payload
            };
        case DELETE_CALL_ELECTION_DATA:
        console.log(action.payload);
            const toDelete = state.AllElections.findIndex(x => x.id === action.payload);
            debugger;
                return {
                    ...state,
                    AllElections: update(state.AllElections, { $splice: [[toDelete, 1]] } )
                };
        case GET_CALL_ELECTION_TIME_LINE_DATA:
        return {
            ...state,
            ElectionTimeLineData: action.payload
        };
        case GET_ACTIVE_ELECTIONS:
        return {
            ...state,
            allActiveElections: action.payload
        };
        case SET_ELECTORATES_DIVISIONS:
        return {
            ...state,
            columnHeaders: action.payload
        };
        case ELECTION_ELECTORATES_REVIEW_DATA:
        return {
            ...state,
            electionElectorates: action.payload
        };
        case ELECTION_ELIGIBILITY_REVIEW_DATA:
        return {
            ...state,
            electionEligibilities: action.payload
        };
    }
    return state;
}

