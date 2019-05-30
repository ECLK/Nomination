
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
  objectionEnd: Maybe(Number)
});

const nominationAllowData = Record({
  team_id: String(),
  division_id: String()
});

const CallElection = Record({
	name: String(),
	module_id: String(),
  status: Maybe(String),
  created_by: String(),
  updated_at: Maybe(Number),
  timeLineData: timeLineData,
  rowData: List(nominationAllowData),
});


export {
	ActiveElection,
	CallElection
}