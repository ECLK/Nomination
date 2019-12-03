import update from 'immutability-helper';
import { USER_INFO_LOADED,USER_LIST_LOADED,HANDLE_CHANGE_PROFILE } from './ProfileTypes';

const initialState = {
  userInfo:{name:'',email:'',party:'',id:''},
  userList:[]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_INFO_LOADED:
      return {
        ...state,
        userInfo: {
         ...state.userInfo,
          ...action.payload
        }
      }; 
    case USER_LIST_LOADED:
      return {
        ...state,
        userList: action.payload
      }; 
    case HANDLE_CHANGE_PROFILE://set profile data to the state
      return {
          ...state,
          userInfo: {
           ...state.userInfo,
            ...action.payload
          }
      };
  }
  return state;
}