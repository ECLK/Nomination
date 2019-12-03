import axios from "axios";
import { API_BASE_URL } from "../../../config.js";
import { USER_INFO_LOADED,USER_LIST_LOADED,HANDLE_CHANGE_PROFILE } from './ProfileTypes';


//get user information
const userInfoLoaded = (userInfo) => {
  return {
    type: USER_INFO_LOADED,
    payload: userInfo,
  };
};

export function getUserInfo(userId) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/user/${userId}`,
    )
    .then(response => {
      const userInfo = response.data;
       dispatch(userInfoLoaded(userInfo));
    }).catch(err => {
      const userInfo = {};
      dispatch(userInfoLoaded(userInfo));
          console.log(err)
    });
  };
}

//get user information
const userListLoaded = (userList) => {
  return {
    type: USER_LIST_LOADED,
    payload: userList,
  };
};

export function getUserList() {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/users`,
    )
    .then(response => {
      const userList = response.data;
       dispatch(userListLoaded(userList));
    }).catch(err => {
      const userList = [];
      dispatch(userListLoaded(userList));
          console.log(err)
    });
  };
}

export const handleChangeProfileData = function handleChangeProfileData(profile) {
  return function (dispatch) {
      dispatch({
          type: HANDLE_CHANGE_PROFILE,
          payload: profile
      })
  };
}
