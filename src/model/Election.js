
import { Record, List } from 'typed-immutable';

const ElectionTimeLine = Record({
  key: String(),
  value: Number(),
});

export const Election =  Record({
  id: String(),
  name: String(),
  moduleId: String(),
  electionTimeLine: List(ElectionTimeLine),
});
