
import {Record,Maybe} from 'typed-immutable';
import {List} from 'typed-immutable';


const Division = Record({
    id: String(),
    name: String(),
    code: String(),
    noOfCandidates: Number(),
    moduleId: String(),
    electionId: String(),
    configId: String(),
    // status: Number(),
});


const Nomination = Record({
    id: String(),
    status: String(),
    paymentStatus:Maybe(String),
});

const AllowedDivision = Record({
    id: String(),
    name: String(),
    code: String(),
    noOfCandidates: Number(),
    electionId: String(),
    teamId: String(),
    currentCandidateCount: Number(),
    nomination: List(Nomination)
    
});

const Candidates = Record({
    id: String(),
    name: String(),
    // no: String(),
});

const Parties = Record({
    id: String(),
    candidates: List(Candidates)
});

const DivisionData = Record({
    id: String(),
    name: String(),
    parties: List(Parties)
});


export {
    Division,
    AllowedDivision,
    DivisionData
}
