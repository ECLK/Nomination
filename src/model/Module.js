import {Record} from 'typed-immutable';

export const Module = Record({
    id: String(),
    name: String(),
    divisionCommonName: String(),
    createdBy: String(),
    status: String(),
    column_name: String(),
    lastModified: Number()
});
