import {Record , List, Maybe} from 'typed-immutable';

const candidate = Record({
    id: Maybe(String),
    nic: Maybe(String),
    name: Maybe(String),
    occupation: Maybe(String),
    address: Maybe(String),
});

const Nomination = Record({
    id: String(),
    division_name: String(),
    party: Maybe(String),
    payment_status: Maybe(String),
    objection_status: Maybe(String),
    approval_status: Maybe(String),
    candidates: List(candidate),
    reviewNote: Maybe(String)
});

const NominationNotification = Record({
    id: String(),
    division_name: String(),
    party: Maybe(String),
    payment_status: Maybe(String),
    objection_status: Maybe(String),
    approval_status: Maybe(String),
    reviewNote: Maybe(String)
});

export {
    Nomination,
    NominationNotification
}