import { Record } from 'typed-immutable';

const Objection = Record({
    id: String(),
    description: String(),
    createDate: Number(),
    createBy: String(),
    createByTeamId: String(),
    nominationId: String(),
});

export {
    Objection,
}