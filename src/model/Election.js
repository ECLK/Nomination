
import { Record, List } from 'typed-immutable';

const electionConfig = Record({
	key: String(),
	value: String(),
});

const Election = Record({
	id: String(),
	name: String(),
	moduleId: String(),
	nominationStart: Number(),
	nominationEnd: Number(),
	objectionStart: Number(),
	objectionEnd: Number(),
	moduleName: String(),
	approval_status: String(),
	electionConfig: List(electionConfig),
});

const AllElection = Record({
	id: String(),
	name: String(),
	createdBy: String(),
	createdAt: Number(),
	updatedAt: Number(),
	moduleId: String(),
});

const ElectionWithStatus = Record({
	id: String(),
	name: String(),
	moduleId: String(),
	status: String(),
})

export {
	Election,
	AllElection,
	ElectionWithStatus,
}