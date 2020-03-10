
import { Record, List,Maybe } from 'typed-immutable';


export const Team = Record({
	partyId: String(),
	partyName: String(),
	abbreviation: String(),
	partyType: String(),
	title: Maybe(String),
	secretaryName: Maybe(String),
	phone: Maybe(String),
	address: Maybe(String),
	fax: Maybe(String),
	approvedSymbol: Maybe(String),
	fileName: Maybe(String),
	filePath: Maybe(String),
	originalName: Maybe(String),
});