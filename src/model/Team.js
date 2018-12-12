
import { Record, List } from 'typed-immutable';

const ContactNumber = Record({
	id: String(),
	number: String(),
});

export const Team = Record({
	id: String(),
	name: String(),
	symbol: String(),
	fax: String(),
	nameOfAuthorizedMember: String(),
	addressOfAuthorizedMember: String(),
	contactNumber: List(ContactNumber),
});