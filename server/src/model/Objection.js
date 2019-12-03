import { Record } from 'typed-immutable';

const Objection = Record({
    id: String(),
    description: String(),
    createdAt: Number(),
    createdBy: String(),
    createdByTeamId: String(),
    nominationId: String(),
});

export {
    Objection,
}
