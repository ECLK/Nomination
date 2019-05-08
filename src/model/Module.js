import {Record, List } from 'typed-immutable';

const electionConfig = Record({
	electionModuleConfigId: String(),
	value: String(),
});

const candidateFormConfiguration = Record({
	candidateConfigId: String(),
});

const supportingDocuments = Record({
	supportDocConfigId: String(),
});

const divisionConfig = Record({
	divisionName: String(),
    divisionCode: String(),
    noOfCandidates: Number(),
});

const eligibilityCheckList = Record({
	eligibilityConfigId: String(),
});

 const Module = Record({
    id: String(),
    name: String(),
    divisionCommonName: String(),
    createdBy: String(),
    status: String(),
    column_name: String(),
    lastModified: Number(),
    electionConfig: List(electionConfig),
    candidateFormConfiguration: List(candidateFormConfiguration),
    supportingDocuments: List(supportingDocuments),
    divisionConfig: List(divisionConfig),
    eligibilityCheckList: List(eligibilityCheckList),
});

 const ModuleList = Record({
    id: String(),
    name: String(),
    divisionCommonName: String(),
    createdBy: String(),
    status: String(),
    column_name: String(),
    lastModified: Number()
});

export {
	Module,
	ModuleList,
}