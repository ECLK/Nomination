import {
    ELECTION_LOAD_SUCCESS,
    ELECTIONS_LOADING,
    POST_ELECTION,
    GET_ELECTION_MODULE,
    POST_CALL_ELECTION,
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
import { API_BASE_URL } from "../../../config.js";
import axios from "axios";

function electionsLoadSuccess(elections) {
    return {
        type: ELECTION_LOAD_SUCCESS,
        payload: elections
    };
}

export function loadElections() {
    return function (dispatch) {
        dispatch({
            type: ELECTIONS_LOADING
        });
        const response = axios
        .get(
          `${API_BASE_URL}/elections/status/${'APPROVE'}`,
        )
        .then(response => {
          const approveElections = response.data;
           dispatch(electionsLoadSuccess(approveElections));
        }).catch(err => {
              console.log(err)
        });
    }
}

export const setElectionData = (val) => {
    return {
        type: POST_ELECTION,
        payload: val
    }
}
export function postElection(elections) {
    return function (dispatch) {

        let electionData = {
            name: elections.electionName,
            module_id: elections.ElectionModule,
            created_by: '234234',
            created_at: '234234',
            updated_at: '234234',
        };


        const response = axios
            .post(
                `${API_BASE_URL}/activeElections`,
                { ...electionData }
            )
            .then(response => {
                let res = {
                    election_id: response.data.id,
                    electionName: response.data.name,
                    ElectionModule: response.data.module_id,
                    created_by: response.data.created_by,
                    created_at: response.data.created_at,
                    updated_at: response.data.updated_at
                }

                dispatch(setElectionData(res));
            }).catch(err => {
                console.log(err)
            });
    };
}


const electionModuleLoaded = (getElectionModules) => {
    return {
        type: GET_ELECTION_MODULE,
        payload: getElectionModules,
    };
};

export function getElectionModules() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/modules/APPROVE/all`,
            )
            .then(response => {
                const getElectionModules = response.data;
                dispatch(
                    electionModuleLoaded(getElectionModules)
                );
            }).catch(err => {
                const getElectionModules = [];
                dispatch(
                    electionModuleLoaded(getElectionModules)
                );
                console.log(err)
            });
    };
}

//get future elections for party logins
const activeElectionLoaded = (getActiveElections) => {
    return {
        type: GET_ACTIVE_ELECTIONS,
        payload: getActiveElections,
    };
};

export function getActiveElections() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/elections/forDemo/new`,
            )
            .then(response => {
                const getActiveElections = response.data;
                dispatch(
                    activeElectionLoaded(getActiveElections)
                );
            }).catch(err => {
                const getActiveElections = [];
                dispatch(
                    activeElectionLoaded(getActiveElections)
                );
                console.log(err)
            });
    };
}

//Get approve elections
// change this name after completeing this function
const allElectionLoaded = (getAllElections) => {
    return {
        type: GET_ALL_ELECTIONS,
        payload: getAllElections,
    };
};

export function getAllElections() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/elections`,
            )
            .then(response => {
                const getAllElections = response.data;
                dispatch(
                    allElectionLoaded(getAllElections)
                );
            }).catch(err => {
                const getAllElections = [];
                dispatch(
                    allElectionLoaded(getAllElections)
                );
                console.log(err)
            });
    };
}

export function setElectionTimeLine(timeLineData) {
    let electionTimeLine = {
        nominationStart: timeLineData.nominationStart,
        nominationEnd: timeLineData.nominationEnd,
        objectionStart: timeLineData.objectionStart,
        objectionEnd: timeLineData.objectionEnd
    }
}

export function setCallElectionData(electionData) {
    let CallElectionData = {

        electionName: electionData.electionName,
        electionModule: electionData.electionModule,
        nominationStart: electionData.nominationStart,
        nominationEnd: electionData.nominationEnd,
        objectionStart: electionData.objectionStart,
        objectionEnd: electionData.objectionEnd,
        depositAmount: electionData.depositAmount,
        WeightagePrefarence: electionData.WeightagePrefarence,
        WeightageVote: electionData.WeightageVote,
        rowData: electionData.rowData,

    };

    return {
        type: SET_CALL_ELECTION_DATA,
        payload: CallElectionData
    };
}

export const setCallElection = (val) => {
    return {
        type: POST_CALL_ELECTION,
        payload: val
    }
}

export function postActiveElections(elections) {
    return function (dispatch) {

        let CallelectionData = {
            name: elections.electionName,
            module_id: elections.ElectionModule,
            created_by: '234234',
            created_at: '234234',
            updated_at: '234234',
        };


        const response = axios
            .post(
                `${API_BASE_URL}/activeElections`,
                { ...CallelectionData }
            )
            .then(response => {
                let res = {
                    election_id: response.data.id,
                    electionName: response.data.name,
                    ElectionModule: response.data.module_id,
                    created_by: response.data.created_by,
                    created_at: response.data.created_at,
                    updated_at: response.data.updated_at
                }

                dispatch(setCallElection(res));
            }).catch(err => {
                console.log(err)
            });
    };
}

//----------- Start of save Call Election Data ----------------

export const setPostCallElectionData = (val) => {
    return {
        type: POST_CALL_ELECTION,
        payload: val
    }
}

export function receivePendingElection (pendingElection) {
    return {
        type: RECEIVE_PENDING_ELECTION,
        payload: pendingElection
    }
}


export function postCallElectionData(CallElectionData, electionData) {
    //TODO: yujith, config ids should get from the front end and the array should be dynamic
    let newDate = new Date();
   
    let allElectionData = {
        "name":CallElectionData.name,
        "module_id":CallElectionData.module_id,
        "status":'PENDING',
        "created_by":"admin",
        "created_at":Date.parse(newDate),
        "updated_at":Date.parse(newDate),
        "timeLineData": 
            {
                nominationStart: CallElectionData.timeLineData.nominationStart,
                nominationEnd: CallElectionData.timeLineData.nominationEnd,
                objectionStart: CallElectionData.timeLineData.objectionStart,
                objectionEnd: CallElectionData.timeLineData.objectionEnd,
                electionId: electionData.election_id,
            },
        "nominationAllowData": CallElectionData.rowData

    }
   

    return function (dispatch) {
        const response = axios
            .post(
                `${API_BASE_URL}/activeElectionsData`,
                { ...allElectionData }
            )
            .then(response => {
                
                let allElectionDataNew = {
                    "id":response.data,
                    "name":CallElectionData.name,
                    "status":'PENDING',
                    "createdBy":"admin",
                    "lastModified":Date.parse(newDate),
                    "moduleId":CallElectionData.module_id
                }
                dispatch(setPostCallElectionData(response));
                dispatch(receivePendingElection(allElectionDataNew));
                dispatch(openSnackbar({ message: CallElectionData.name + ' has been submitted for approval' }));
            }).catch(err => {
                dispatch(openSnackbar({ message: ' Something went wrong' }));
                console.log(err)
            });
    };
}
//----------- Start of edit Call Election Data ----------------

export const setEditCallElectionData = (val) => {
    return {
        type: EDIT_CALL_ELECTION_DATA,
        payload: val
    }
}

export function editCallElectionData(CallElectionData, electionId) {
        //TODO: yujith, config ids should get from the front end and the array should be dynamic
        let newDate = new Date();
       
        let allElectionData = {
            "name":CallElectionData.name,
            "module_id":CallElectionData.module_id,
            "status":'PENDING',
            "created_by":"admin",
            "created_at":Date.parse(newDate),
            "updated_at":Date.parse(newDate),
            "timeLineData": 
                {
                    nominationStart: CallElectionData.timeLineData.nominationStart,
                    nominationEnd: CallElectionData.timeLineData.nominationEnd,
                    objectionStart: CallElectionData.timeLineData.objectionStart,
                    objectionEnd: CallElectionData.timeLineData.objectionEnd,
                    electionId: electionId,
                },
            "nominationAllowData": CallElectionData.rowData
    
        }
        return function (dispatch) {
            const response = axios
                .put(
                    `${API_BASE_URL}/activeElectionsData/${electionId}`,
                    { ...allElectionData }
                )
                .then(response => {
                   const data={electionId:electionId,status:'PENDING'}
                    dispatch(setEditCallElectionData(data));
                    dispatch(openSnackbar({ message: CallElectionData.name + ' has been updated ' }));
                }).catch(err => {
                    dispatch(openSnackbar({ message: ' Something went wrong' }));
                    console.log(err)
                });
        };
    }

//----------- End of edit Call Election Data ----------------

//----------- Start of delete Call Election Data ----------------

export const setDeleteCallElectionData = (val) => {
    return {
        type: DELETE_CALL_ELECTION_DATA,
        payload: val
    }
}

export function deleteCallElectionData(electionId,electionName) {
       
        return function (dispatch) {
            const response = axios
                .delete(
                    `${API_BASE_URL}/activeElectionsData/${electionId}`,
                )
                .then(response => {
                    dispatch(setDeleteCallElectionData(electionId));
                    dispatch(openSnackbar({ message: electionName + ' has been deleted ' }));
                }).catch(err => {
                    dispatch(openSnackbar({ message: ' Something went wrong' }));
                    console.log(err)
                });
        };
    }

//----------- End of delete Call Election Data ----------------

export function getAllElectionReviews() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/elections/status/PENDING`,
            )
            .then(response => {
                const getElectionModules = response.data;

                dispatch(
                    electionModuleLoaded(getElectionModules)
                );
            }).catch(err => {
                const getElectionModules = [];
                dispatch(
                    electionModuleLoaded(getElectionModules)
                );
                console.log(err)
            });
    };
}

//Get data for election approve detail page

export const electionReviewDataLoaded = (val) => {
    return {
        type: ELECTION_REVIEW_DATA,
        payload: val
    }
}
export function getElectionReviewData(id) {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/elections/${id}`,
            )
            .then(response => {
                const getElectionReviewData = response.data;
                dispatch(
                    electionReviewDataLoaded(getElectionReviewData)
                );
            }).catch(err => {
                const getElectionReviewData = [];
                dispatch(
                    electionReviewDataLoaded(getElectionReviewData)
                );
                console.log(err)
            });
    };
}

//Get electorates data for election approve detail page 

export const electionElectoratesReviewDataLoaded = (val) => {
    return {
        type: ELECTION_ELECTORATES_REVIEW_DATA,
        payload: val
    }
}
export function getElectoratesData(id) {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/activeElectionsData/${id}/electorates`,
            )
            .then(response => {
                const getElectoratesData = response.data;
                debugger;
                dispatch(
                    electionElectoratesReviewDataLoaded(getElectoratesData)
                );
            }).catch(err => {
                const getElectoratesData = [];
                debugger;
                dispatch(
                    electionElectoratesReviewDataLoaded(getElectoratesData)
                );
                console.log(err)
            });
    };
}

//Get eligibility config data for election approve detail page by election id

export const electionEligibilityDataLoaded = (val) => {
    return {
        type: ELECTION_ELIGIBILITY_REVIEW_DATA,
        payload: val
    }
}
export function getEligibilityData(id) {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/activeElectionsData/${id}/eligibility`,
            )
            .then(response => {
                const getEligibilityData = response.data;
                debugger;
                dispatch(
                    electionEligibilityDataLoaded(getEligibilityData)
                );
            }).catch(err => {
                const getEligibilityData = [];
                debugger;
                dispatch(
                    electionEligibilityDataLoaded(getEligibilityData)
                );
                console.log(err)
            });
    };
}

// change election review status
export const onChangeApprovalData = (electionApprovals) => {
    return {
      type: ON_ELECTION_APPROVAL_CHANGE,
      payload: electionApprovals,
    }
  };

  export function receiveApprovedElection (electionApprovals) {
    return {
        type: RECEIVE_APPROVED_ELECTION,
        payload: electionApprovals
    }
}
  
  export function onChangeApproval(electionId,status,reviewNote) {
    return function (dispatch) {
      let electionApprovals = {
        updatedAt: Date.parse(new Date()),
        status: status,
        electionId: electionId,
        reviewNote:reviewNote
      };
      
       
      const response = axios
      .post(
        `${API_BASE_URL}/activeElections/${electionId}/approve-active-election`,
            {...electionApprovals}
      )
      .then(response => {
         dispatch(onChangeApprovalData(response.data));
         dispatch(receiveApprovedElection(electionApprovals));

      }).catch(err => {
            console.log(err)
      });
    };
  }


  export const openSnackbar = ({ message }) => {
     const data = {
        open: true,
        message,
      }
    return {
        type: SNACK_BAR_MESSAGE_LOADED,
        payload: data,
      }
    
  };
  export const handleSnackbarClose = () => {
    const data = {
       open: false,
       message:''
     }
   return {
       type: SNACK_BAR_MESSAGE_LOADED,
       payload: data,
     }
   
 };

 export const getFieldOptions = function getFieldOptions(moduleId) {
    return function (dispatch) {
        const response = axios
            .get(
                `${API_BASE_URL}/field-options/electorates-divisions/${moduleId}`
            )
            .then(response => {
                dispatch(setElectoratesDivisions(response.data));
            }).catch(err => {
                console.log(err)
            });
    }
}
export const setElectoratesDivisions = (val) => {
    return {
        type: SET_ELECTORATES_DIVISIONS,
        payload: val
    }
}

export const asyncValidateElection = function asyncValidateElection(electionName) {
    let promises = [];
    if(electionName){
        promises.push(axios.get(`${API_BASE_URL}/elections/validations/${electionName}`));
        return axios.all(promises)
            .then(args =>{
                return {
                    exist: args[0].data,
                }
            });
    }
}

export const setGetCallElectionData = (val) => {
    return {
        type: GET_CALL_ELECTION_DATA,
        payload: val
    }
}

export function getCallElectionData(electionId,electionName,moduleId) {
    //TODO: config ids should get from the front end and the array should be dynamic
    let newDate = new Date();
   
    let allElectionData = {
        "name":'asd',
        "module_id":'xd',
        "status":'PENDING',
        "created_by":"admin",
        "created_at":Date.parse(newDate),
        "updated_at":Date.parse(newDate),
        "timeLineData": 
            {
                nominationStart: Date.parse(newDate),
                nominationEnd: Date.parse(newDate),
                objectionStart: Date.parse(newDate),
                objectionEnd: Date.parse(newDate),
                electionId: electionId,
            },
        "nominationAllowData": {}

    }
  
    return function (dispatch) {
        const response = axios
            .get(
                `${API_BASE_URL}/activeElectionsData/${electionId}`
            )
            .then(response => {
                dispatch(setGetCallElectionData(response.data));
            }).catch(err => {
                let  CallElectionData= {
                    "name":electionName,
                    "module_id":moduleId,
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
                }
                dispatch(setGetCallElectionData(CallElectionData));
                console.log(err)
            });
    }
}

export const handleChangeElectionData = function handleChangeElectionData(election) {

    return function (dispatch) {
        dispatch({
            type: HANDLE_CHANGE_CALL_ELECTION,
            payload: election
        })
    };
}

export const setGetElectionTimeLineData = (val) => {
    return {
        type: GET_CALL_ELECTION_TIME_LINE_DATA,
        payload: val
    }
}

export function getElectionTimeLine(electionId) {
  
    return function (dispatch) {
        const response = axios
            .get(
                `${API_BASE_URL}/elections/${electionId}`
            )
            .then(response => {
                dispatch(setGetElectionTimeLineData(response.data));
            }).catch(err => {
                console.log(err)
            });
    }
}


  