
import {Record,List,Maybe} from 'typed-immutable';

 const ActiveElection =  Record({
  id: String(),
  name: String(),
  module_id: String(),
});

const timeLineData = Record({
  electionId: String(),
  nominationStart: Maybe(Number),
  nominationEnd: Maybe(Number),
  objectionStart: Maybe(Number),
  objectionEnd: Maybe(Number),
  paymentStart: Maybe(Number),
  paymentEnd: Maybe(Number),
  approvalStart: Maybe(Number),
  approvalEnd: Maybe(Number)
});

const nominationAllowData = Record({
  team_id: String(),
  division_id: String()
});

const electoratesData = Record({
  team_id: String(),
  division_id: String()
});

const eligibilityData = Record({
  eligibility_config_id: String(),
  description: String()
});

const CallElection = Record({
	name: String(),
	module_id: String(),
  status: Maybe(String),
  created_by: String(),
  updated_at: Maybe(Number),
  timeLineData: timeLineData,
  rowData: List(nominationAllowData),
  rowDataIg: List(nominationAllowData),
});


export {
	ActiveElection,
  CallElection,
  electoratesData,
  eligibilityData
}