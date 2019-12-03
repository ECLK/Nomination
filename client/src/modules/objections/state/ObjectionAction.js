import axios from "axios";
import { API_BASE_URL } from "../../../config.js";
import { OBJECTIONS_LOADED, ON_OBJECTION_APPROVAL_CHANGE, ON_OBJECTION_NOTES_CHANGE } from './ObjectionTypes';

const objectionsLoaded = (objections) => {
  return {
    type: OBJECTIONS_LOADED,
    payload: objections,
  };
};

export const getObjections = () => {

  return (dispatch) => {
    /*const response = axios
     .get(
     `${API_BASE_URL}/objections`
     )
     .then(response => {
     dispatch({
     type: OBJECTIONS_LOADED,
     payload: response.data
     })
     });*/
    const objections = [{
      objection_id: "75553fd3-f7fc-4ec6-b963-3fc1c3cbe0d3",
      created_date: "2018-12-23",
      created_by: "Party secretary",
      objected_by: "United People's Freedom Alliance ( UPFA )",
      nomination: "United National Party ( UNP ) | Gampaha",
      notes: "",
      objection_criteria: "Age is below 35",
      objection: "Falsified Birth Certificate",
      status: "approved",
    }, {
      objection_id: "5a3ac5eb-368c-4c47-a479-d69a1b64297e",
      created_date: "2018-12-25",
      created_by: "Party secretary",
      objected_by: "United National Party ( UNP )",
      nomination: "United People's Freedom Alliance ( UPFA )",
      notes: "",
      objection_criteria: "convicte",
      objection: "convicted of felony",
      status: "approved",
    }];

    setTimeout( () => {
      dispatch(objectionsLoaded(objections));
    }, 1000);
  };
}

export const onChangeApproval = (id, status) => {
  return {
    type: ON_OBJECTION_APPROVAL_CHANGE,
    payload: {id, status},
  }
};

export const onChangeObjectionNotes = (id, note) => {
  return {
    type: ON_OBJECTION_NOTES_CHANGE,
    payload: {id, note},
  }
};