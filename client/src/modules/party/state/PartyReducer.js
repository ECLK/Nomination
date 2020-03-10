import update from 'immutability-helper';
import {
  PARTY_LIST_LOADED,
  POST_PARTY_DATA,
  GET_PARTY_DETAILS,
  PUT_PARTY_DETAILS,
  DELETE_PARTY_DETAILS,
  GET_PARTY_LOGO,
} from "./PartyTypes";

const initialState = {
  //define the common states only
  PartyDetails:{
          partyName: '',
          partyType: '',
          title:'',
          address:'',
          abbreviation:'',
          approvedSymbol: '',
          filePath: '',
          secretaryName: '',
          phoneList: '',
          faxList: '',
          fileName:'',
          originalname:''
  },
  partyList:[],
  partyLogo:''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PARTY_DETAILS:
      return {
        ...state,
        PartyDetails: action.payload
      }; 
    case PUT_PARTY_DETAILS:
      const PartyIndex = state.partyList.findIndex(x => x.team_id === action.payload.team_id);
      return {
        ...state,
        partyList: update(state.partyList, {[PartyIndex]: {$set: action.payload}})
      }
    case PARTY_LIST_LOADED:
      return {
        ...state,
        partyList: action.payload
      }; 
    case DELETE_PARTY_DETAILS:
      const deleteIndex = state.partyList.findIndex(x => x.team_id === action.payload.team_id);
      return {
        ...state,
        partyList: update(state.partyList, { $splice: [[deleteIndex, 1]] } )
      }; 
      case GET_PARTY_LOGO:
      return {
        ...state,
        partyLogo: action.payload
      }; 
      case POST_PARTY_DATA:
      return {
        ...state,
        partyList: [
          ...state.partyList,
          action.payload
      ]
      };
      
  }
  return state;
}

