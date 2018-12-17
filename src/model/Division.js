import { Record } from 'typed-immutable';

export const Division = Record({
    id: String(),
    name: String(),
    code: String(),
    noOfCandidates: Number(),
    moduleId: String(),
    electionId: String(),
    configId: String(),
    status: String(),
});