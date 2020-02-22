import {
    CREATE_ELECTION_MODULE,
    UPDATE_ELECTION_MODULE,
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
import { API_BASE_URL } from "../../../config.js";
import axios from "axios";
import { openSnackbar } from '../../election/state/ElectionAction';

//----------- Start of save Call Election Data ----------------

export const setPostModuleData = (val) => {
    return {
        type: CREATE_ELECTION_MODULE,
        payload: val
    }
}

export function postCallElectionData(electionData) {
    //TODO: config ids should get from the front end and the array should be dynamic

    let allElectionModuleData = {
        "moduleId": "1268362183761283718236",
        "divisionCommonName":'Provintial',
        "createdBy":'admin',
        "createdAt":'',
        "updatedAt":'',
        "candidateFormConfiguration": [
            {
                candidateConfigId: '1',
            },
            {
                candidateConfigId: '2',
            },
            {
                candidateConfigId: '3',
            },
            {
                candidateConfigId: '4',
            },
        ],
        "supportingDocuments": [
            {
                supportDocConfigId: '15990459-2ea4-413f-b1f7-29a138fd7a97',
            },
            {
                supportDocConfigId: 'fe2c2d7e-66de-406a-b887-1143023f8e72',
            },
            {
                supportDocConfigId: 'ff4c6768-bdbe-4a16-b680-5fecb6b1f747',
            }
        ],
        "divisionConfig":[
            {
                divisionName: 'division name',
                divisionCode: 'code',
                noOfCandidates: 'noOfCandidates',
            },
            {
                divisionName: 'division name',
                divisionCode: 'code',
                noOfCandidates: 'noOfCandidates',
            },
            {
                divisionName: 'division name',
                divisionCode: 'code',
                noOfCandidates: 'noOfCandidates',
            }
        ],
    "electionConfig": [
        {
            electionModuleConfigId: '15990459-2ea4-413f-b1f7-29a138fd7a97',
            value:'allowed',
        },
        {
            supportDocConfigId: 'fe2c2d7e-66de-406a-b887-1143023f8e72',
            value:'allowed',
        },
        {
            supportDocConfigId: 'ff4c6768-bdbe-4a16-b680-5fecb6b1f747',
            value:'allowed',
        }

    ],
    }

    return function (dispatch) {
        const response = axios
            .post(
                `${API_BASE_URL}/modules`,
                { ...allElectionModuleData }
            )
            .then(response => {
                console.log("response.data", response.data);
                dispatch(setPostModuleData(response));
            }).catch(err => {
                console.log(err)
            });
    }
}

export const createElection = function createElection(electionName) {
    return function (dispatch) {
        dispatch({
            type: CREATE_ELECTION_MODULE,
            payload: electionName
        })
    };
}

export const updateElection = function updateElection(election) {

    return function (dispatch) {
        dispatch({
            type: UPDATE_ELECTION_MODULE,
            payload: election
        })
    };
}

export const saveElection = function saveElection(election) {

    return function (dispatch) {

        dispatch({
            type: UPDATE_ELECTION_MODULE,
            payload: {} 
        })
    };
}

export const submitElection = function saveElection(election) {
    let allElectionModuleData = {
        "name": election.name,
        "id": "1268362183761283718236",
        "divisionCommonName":'Provintial',
        "createdBy":'admin',
        "createdAt":'',
        "updatedAt":'',
        "candidateFormConfiguration": [
        ],
        "supportingDocuments": [
            {
                supportDocConfigId: '15990459-2ea4-413f-b1f7-29a138fd7a97',
            },
            {
                supportDocConfigId: 'fe2c2d7e-66de-406a-b887-1143023f8e72',
            },
            {
                supportDocConfigId: 'ff4c6768-bdbe-4a16-b680-5fecb6b1f747',
            }
        ],
        "divisionConfig":[
            {
                divisionName: 'Sample',
                divisionCode: 'code',
                noOfCandidates: '1',
            },
            {
                divisionName: 'Sample3',
                divisionCode: 'code',
                noOfCandidates: '2',
            },
            {
                divisionName: 'Sample5',
                divisionCode: 'code',
                noOfCandidates: '3',
            }
        ],
    "electionConfig": [
        {
            electionModuleConfigId: '15990459-2ea4-413f-b1f7-29a138fd7a97',
            value:'allowed',
        }
    ],
    }

    return function (dispatch) {
        const response = axios
            .post(
                `${API_BASE_URL}/election-modules`,
                { ...allElectionModuleData , ...election}
            )
            .then(response => {
                if(response.data){
                    election.submited = true;
                    var electionNew= {createdAt: response.data.createdAt,
                        createdBy: response.data.createdBy,
                        id: response.data.id,
                        lastModified: response.data.updatedAt,
                        moduleId: "",
                        name: response.data.name,
                        status: "PENDING"}
                    dispatch({
                        type: UPDATE_ELECTION_MODULE,
                        payload: election
                    });
                    dispatch({
                        type: RECIVE_PENDING_ELECTION_MODULE,
                        payload: electionNew
                    });
                    
                    dispatch(openSnackbar({ message: election.name + ' has been submitted for approval' }));
                }
            }).catch(err => {
                console.log(err)
            });
    }
}

export const setUpdatedTemplateData = (val) => {
    return {
        type: UPDATE_ELECTION_MODULE,
        payload: val
    }
}

  export function editElection(moduleId,election) {
    return function (dispatch) {
      const response = axios
      .put(
        `${API_BASE_URL}/election-modules/${moduleId}`,
        {...election}
      )
      .then(response => {
        var electionNew= {createdAt: response.data.createdAt,
            createdBy: 'admin',
            id: response.data.id,
            lastModified: response.data.updatedAt,
            moduleId: "",
            name: response.data.name,
            status: "PENDING"}
        dispatch({
            type: GET_REJECTED_ELECTION_MODULE,
            payload: electionNew
        });
        
         dispatch(openSnackbar({ message: election.name + ' has been updated ' }));
      }).catch(err => {
        dispatch(openSnackbar({ message: ' Something went wrong!' }));
            console.log(err)
      });
    };
  }
//get pending election modules
const pendingElectionModuleLoaded = (getPendingElectionModules) => {
    return {
        type: GET_PENDING_ELECTION_MODULE,
        payload: getPendingElectionModules,
    };
};

export function getPendingElectionModules() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/modules/PENDING/all`,
            )
            .then(response => {
                const getPendingElectionModules = response.data;
                dispatch(
                    pendingElectionModuleLoaded(getPendingElectionModules)
                );
            }).catch(err => {
                const getPendingElectionModules = [];
                dispatch(
                    pendingElectionModuleLoaded(getPendingElectionModules)
                );
                console.log(err)
            });
    };
}

//get approve election modules
const approvedElectionModuleLoaded = (getApprovedElectionModules) => {
    return {
        type: GET_APPROVED_ELECTION_MODULE,
        payload: getApprovedElectionModules,
    };
};

export function getApproveElectionModules() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/modules/APPROVE/all`,
            )
            .then(response => {
                const getApprovedElectionModules = response.data;
                dispatch(
                    approvedElectionModuleLoaded(getApprovedElectionModules)
                );
            }).catch(err => {
                const getApprovedElectionModules = [];
                dispatch(
                    approvedElectionModuleLoaded(getApprovedElectionModules)
                );
                console.log(err)
            });
    };
}

//get approve election modules
const rejectedElectionModuleLoaded = (getRejectedElectionModules) => {
    return {
        type: GET_REJECTED_ELECTION_MODULE,
        payload: getRejectedElectionModules,
    };
};

export function getRejectedElectionModules() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/modules/REJECT/all`,
            )
            .then(response => {
                const getRejectedElectionModules = response.data;
                dispatch(
                    rejectedElectionModuleLoaded(getRejectedElectionModules)
                );
            }).catch(err => {
                const getRejectedElectionModules = [];
                dispatch(
                    rejectedElectionModuleLoaded(getRejectedElectionModules)
                );
                console.log(err)
            });
    };
}

//delete election modules
const deletedElectionModuleLoaded = (moduleId) => {
    return {
        type: GET_DELETED_ELECTION_MODULE,
        payload: moduleId,
    };
};

export function deleteElectionModule(moduleId) {
    return function (dispatch) {

        const response = axios
            .delete(
                `${API_BASE_URL}/modules/${moduleId}`,
            )
            .then(response => {
                const getDeletedElectionModuleLoaded = response.data;
                dispatch(
                    deletedElectionModuleLoaded(moduleId)
                );
                dispatch(openSnackbar({ message: ' Election template has been deleted' }));

            }).catch(err => {
                // const moduleId = [];
                dispatch(
                    deletedElectionModuleLoaded(moduleId)
                );
                dispatch(openSnackbar({ message: ' Something went wrong!' }));
                console.log(err)
            });
    };
}

export const getFieldOptions = function getFieldOptions() {
    let promises = [];

    promises.push(axios.get(`${API_BASE_URL}/field-options/candidate-configs`));
    promises.push(axios.get(`${API_BASE_URL}/field-options/candidate-supporting-docs`));
    promises.push(axios.get(`${API_BASE_URL}/field-options/nomination-supporting-docs`));
    promises.push(axios.get(`${API_BASE_URL}/field-options/objection-supporting-docs`));
    promises.push(axios.get(`${API_BASE_URL}/field-options/payment-supporting-docs`));


    return axios.all(promises)
        .then(args =>{
            return {
                candidateConfigs: args[0].data,
                candidateSupportingDocs: args[1].data,
                nominationSupportingDocs: args[2].data,
                objectionSupportingDocs: args[3].data,
                paymentSupportingDocs: args[4].data,
            }
        });
}

//----------- End of save Create Election Data ----------------
export const setGetTemplateData = (val) => {
    return {
        type: GET_ELECTION_TEMPLATE_DATA,
        payload: val
    }
}

export function getElectionTemplateData(moduleId) {
    if(moduleId===undefined){
        return function (dispatch) {
            const new_election_module= { 
                name: '' ,
                // nominationSubmission: [],
                divisionCommonName:'',
                approval_status:'',
                eligibilityCheckList: [],
                candidateFormConfiguration: [],
                supportingDocuments: [],
                divisionConfig:[],   
                electionConfig:[],
                ElectionTemplateReviewData:[],
            }
            dispatch({
                type: GET_ELECTION_TEMPLATE_DATA,
                payload: new_election_module
            })
        };
    }else{
        //TODO: config ids should get from the front end and the array should be dynamic
    let allElectionModuleData = {
        "moduleId": moduleId,
        "divisionCommonName":'Provintial',
        "createdBy":'admin',
        "createdAt":'',
        "updatedAt":'',
        "candidateFormConfiguration": [
            {
                candidateConfigId: '1',
            },
            {
                candidateConfigId: '2',
            },
            {
                candidateConfigId: '3',
            },
            {
                candidateConfigId: '4',
            },
        ],
        "supportingDocuments": [
            {
                supportDocConfigId: '15990459-2ea4-413f-b1f7-29a138fd7a97',
            },
            {
                supportDocConfigId: 'fe2c2d7e-66de-406a-b887-1143023f8e72',
            },
            {
                supportDocConfigId: 'ff4c6768-bdbe-4a16-b680-5fecb6b1f747',
            }
        ],
        "divisionConfig":[
            {
                divisionName: 'division name',
                divisionCode: 'code',
                noOfCandidates: 'noOfCandidates',
            },
            {
                divisionName: 'division name',
                divisionCode: 'code',
                noOfCandidates: 'noOfCandidates',
            },
            {
                divisionName: 'division name',
                divisionCode: 'code',
                noOfCandidates: 'noOfCandidates',
            }
        ],
    "electionConfig": [
        {
            electionModuleConfigId: '15990459-2ea4-413f-b1f7-29a138fd7a97',
            value:'allowed',
        },
        {
            supportDocConfigId: 'fe2c2d7e-66de-406a-b887-1143023f8e72',
            value:'allowed',
        },
        {
            supportDocConfigId: 'ff4c6768-bdbe-4a16-b680-5fecb6b1f747',
            value:'allowed',
        }

    ],
    }
    return function (dispatch) {
        const response = axios
            .get(
                `${API_BASE_URL}/modules/${moduleId}`,
                { ...allElectionModuleData }
            )
            .then(response => {
                dispatch(setGetTemplateData(response.data));
            }).catch(err => {
                console.log(err)
            });
    }
}
}

export const asyncValidateTemplate = function asyncValidateTemplate(templateName) {
    let promises = [];
    if(templateName){
        promises.push(axios.get(`${API_BASE_URL}/modules/validations/${templateName}`));
        return axios.all(promises)
            .then(args =>{
                return {
                    exist: args[0].data,
                }
            });
    }
}

//Get all election templates
const allElectionTemplateLoaded = (getAllTemplates) => {
    return {
        type: GET_ALL_ELECTION_TEMPLATES,
        payload: getAllTemplates,
    };
};

export function getAllElectionTemplates() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/election-modules`,
            )
            .then(response => {
                const getAllTemplates = response.data;
                dispatch(
                    allElectionTemplateLoaded(getAllTemplates)
                );
            }).catch(err => {
                const getAllTemplates = [];
                dispatch(
                    allElectionTemplateLoaded(getAllTemplates)
                );
                console.log(err)
            });
    };
}

//Get data for election template approve detail page
export const electionTemplateReviewDataLoaded = (val) => {
    return {
        type: ELECTION_TEMPLATE_REVIEW_DATA,
        payload: val
    }
}
export function getElectionTemplateReviewData(id) {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/elections/${id}`,
            )
            .then(response => {
                const getElectionTemplateReviewData = response.data;
                dispatch(
                    electionTemplateReviewDataLoaded(getElectionTemplateReviewData)
                );
            }).catch(err => {
                const getElectionTemplateReviewData = [];
                dispatch(
                    electionTemplateReviewDataLoaded(getElectionTemplateReviewData)
                );
                console.log(err)
            });
    };
}

// change election template review status
export const onChangeApprovalData = (templateApprovals) => {
    return {
      type: ON_ELECTION_TEMPLATE_APPROVAL_CHANGE,
      payload: templateApprovals,
    }
  };

  export function receiveApprovedElectionTemplates (templateApprovals) {
    return {
        type: RECEIVE_APPROVED_ELECTION_TEMPLATES,
        payload: templateApprovals
    }
}
  
  export function onChangeApproval(moduleId,status,reviewNote,name) {
    return function (dispatch) {
      let templateApprovals = {
        updatedAt: Date.parse(new Date()),
        status: status,
        moduleId: moduleId,
        reviewNote:reviewNote
      };
      
      const response = axios
      .put(
        `${API_BASE_URL}/election-modules/${moduleId}/approve-election-templates`,
            {...templateApprovals}
      )
      .then(response => {
         dispatch(onChangeApprovalData(response.data));
         dispatch(receiveApprovedElectionTemplates(templateApprovals));
         dispatch(openSnackbar({ message:(status==='APPROVE') ?  name + ' has been approved' :  name + ' has been rejected'}));
      }).catch(err => {
            console.log(err);
            dispatch(openSnackbar({ message: err.response.data.message }));
      });
    };
  }