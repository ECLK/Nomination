
import {Record} from 'typed-immutable';
import {List} from 'typed-immutable';


const Division = Record({
    id: String(),
    name: String(),
    code: String(),
    noOfCandidates: Number(),
    moduleId: String(),
    electionId: String(),
    configId: String(),
    status: Number(),
});


const Nomination = Record({
    id: String(),
    status: String(),
});

const AllowedDivision = Record({
    id: String(),
    name: String(),
    code: String(),
    noOfCandidates: Number(),
    electionId: String(),
    teamId: String(),
    currentCandidateCount: Number(),
    nomination: List(Nomination),
});


export {
    Division,
    AllowedDivision,
}
