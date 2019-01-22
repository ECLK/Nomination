
import { Record, List } from 'typed-immutable';

const ElectionTimeLine = Record({
	key: String(),
	value: Number(),
});

const Election = Record({
	id: String(),
	name: String(),
	moduleId: String(),
	electionTimeLine: List(ElectionTimeLine),
});

const AllElection = Record({
	id: String(),
	name: String(),
	createdBy: String(),
	createdAt: Number(),
	updatedAt: Number(),
	moduleId: String(),
});

export {
	Election,
	AllElection
}