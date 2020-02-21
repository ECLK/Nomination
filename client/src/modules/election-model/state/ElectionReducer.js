import update from 'immutability-helper';

import {
    CREATE_ELECTION_MODULE,
    UPDATE_ELECTION_MODULE,
    CLEAR_ELECTION_MODULE,
    GET_APPROVED_ELECTION_MODULE,
    GET_PENDING_ELECTION_MODULE,
    GET_REJECTED_ELECTION_MODULE,
    GET_ELECTION_TEMPLATE_DATA,
    GET_DELETED_ELECTION_MODULE,
    GET_ALL_ELECTION_TEMPLATES,
    ELECTION_TEMPLATE_REVIEW_DATA,
    ON_ELECTION_TEMPLATE_APPROVAL_CHANGE,
    RECEIVE_APPROVED_ELECTION_TEMPLATES,
    RECIVE_PENDING_ELECTION_MODULE
} from "./ElectionTypes";

const initialState = {
    //define the common states only
    RejectedElectionModules:[],
    PendingElectionModules:[],
    ApprovedElectionModules:[],
    new_election_module: { 
        name: "" ,
        // nominationSubmission: [],
        divisionCommonName:'',
        approval_status:'',
        eligibilityCheckList: [],
        candidateFormConfiguration: [],
        supportingDocuments: [],
        divisionConfig:[],   
        electionConfig:[],
        ElectionTemplateReviewData:[],
    },
    AllElectionTemplates:[]
};

function findApprovalIndex(AllElectionTemplates, id) {
    return AllElectionTemplates.findIndex(x => x.id === id);
  }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_ELECTION_MODULE:
            return Object.assign({}, state, {
                new_election_module: {
                    ...state.new_election_module,
                    name: action.payload
                }
            });
        case UPDATE_ELECTION_MODULE:
            return {
                ...state,
                new_election_module: action.payload
            };
        case RECIVE_PENDING_ELECTION_MODULE:  
        // const AllElectionsPrev = state.AllElectionTemplates;
        // const i = findApprovalIndex(AllElectionsPrev, action.payload.id);
        // debugger;
        // return {
        //     ...state,
        //     AllElectionTemplates: update(state.AllElectionTemplates, {[i]: {status: {$set: action.payload.status}}})
        // };  
        return {
            ...state,
            AllElectionTemplates: [
                ...state.AllElectionTemplates,
                action.payload
            ]
        };  
        case GET_APPROVED_ELECTION_MODULE:
            return {
                ...state,
                ApprovedElectionModules: action.payload
            }; 
        case GET_PENDING_ELECTION_MODULE:
            return {
                ...state,
                PendingElectionModules: action.payload
            }; 
        case GET_REJECTED_ELECTION_MODULE:
            const AllElectionsPrev = state.AllElectionTemplates;
            const i = findApprovalIndex(AllElectionsPrev, action.payload.id);
            debugger;
            return {
                ...state,
                AllElectionTemplates: update(state.AllElectionTemplates, {[i]: {status: {$set: action.payload.status}}})
            };  
            // return {
            //     ...state,
            //     RejectedElectionModules: action.payload
            // };  
        case GET_ELECTION_TEMPLATE_DATA:
            return {
                ...state,
                new_election_module: action.payload
            };  
        case GET_DELETED_ELECTION_MODULE:
        const toDelete = state.AllElectionTemplates.findIndex(x => x.id === action.payload);
            return {
                ...state,
                AllElectionTemplates: update(state.AllElectionTemplates, { $splice: [[toDelete, 1]] } )
            };
        case GET_ALL_ELECTION_TEMPLATES:
            return {
                ...state,
                AllElectionTemplates: action.payload
            };
        case ELECTION_TEMPLATE_REVIEW_DATA://save timeline, electionConfig, allow nominaton
            return {
                ...state,
                ElectionTemplateReviewData: action.payload
            };
        case ON_ELECTION_TEMPLATE_APPROVAL_CHANGE:
            return {
                ...state,
                ElectionReviewData: action.payload
            };
        case RECEIVE_APPROVED_ELECTION_TEMPLATES:
        const AllElectionTemplates = state.AllElectionTemplates;
        const index = findApprovalIndex(AllElectionTemplates, action.payload.moduleId);
            return {
                ...state,
                AllElectionTemplates: update(AllElectionTemplates, {[index]: {status: {$set: action.payload.status}}})
            }; 
    }
    return state;
}
