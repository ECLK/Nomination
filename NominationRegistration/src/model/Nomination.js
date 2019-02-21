import {Record} from 'typed-immutable';

export const Nomination = Record({
    id: String(),
    status: String(),
    teamId: String(),
    electionId: String(),
    divisionConfigDataId: String(),
});