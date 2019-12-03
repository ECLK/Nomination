import { combineReducers } from "redux";

import Nomination from "../modules/nomination/state/NominationReducer.js";
import Payment from "../modules/payment/state/PaymentReducer.js";
import Election from "../modules/election/state/ElectionReducer.js";
import Objection from "../modules/objections/state/ObjectionReducer.js";
import ElectionModel from "../modules/election-model/state/ElectionReducer.js";
import Profile from "../modules/profile/state/ProfileReducer.js";



export default combineReducers({
    Nomination,
    Payment,
    Election,
    Objection,
    ElectionModel,
    Profile
    //other reducers
});
