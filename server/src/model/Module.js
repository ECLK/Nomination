import {Record, List,Maybe } from 'typed-immutable';

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
    approval_status:Maybe(String),
    reviewNote:Maybe(String)
});

const CandidateConfig = Record({
    candidate_config_id: String(),
    key_name: String(),
    description: String(),
    json_schema: Maybe(String)
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

const AllElectionTemplate = Record({
	id: String(),
	name: String(),
	createdBy: String(),
	createdAt: Number(),
	lastModified: Number(),
	status: String(),
	moduleId: String(),
});

export {
	Module,
    ModuleList,
    AllElectionTemplate,
    CandidateConfig
}