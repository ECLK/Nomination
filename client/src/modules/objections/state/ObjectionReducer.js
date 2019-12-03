import update from 'immutability-helper';
import { OBJECTIONS_LOADED, ON_OBJECTION_APPROVAL_CHANGE, ON_OBJECTION_NOTES_CHANGE } from './ObjectionTypes';

const initialState = {
  objections: [],
};

const findIndex = (objections, id) => {
  return objections.findIndex(x => x.objection_id === id);
};

export default function reducer(state = initialState, action) {
  let objections, index;
  switch (action.type) {
    case OBJECTIONS_LOADED:
      return {
        ...state,
        objections: action.payload
      };
    case ON_OBJECTION_APPROVAL_CHANGE:
      objections = state.objections;
      index = findIndex(objections, action.payload.id);
      return {
        ...state,
        objections: update(objections, {[index]: { status: {$set: action.payload.status }}})
      };
    case ON_OBJECTION_NOTES_CHANGE:
      objections = state.objections;
      index = findIndex(objections, action.payload.id);
      return {
        ...state,
        objections: update(objections, {[index]: { notes: { $set: action.payload.notes }}})
      };

  }
  return state;
}