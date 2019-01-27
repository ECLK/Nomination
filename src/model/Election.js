
import { Record, List } from 'typed-immutable';

// for Election with Timeline
const ElectionTimeLine = Record({
  key: String(),
  value: Number(),
});

const Election =  Record({
  id: String(),
  name: String(),
  moduleId: String(),
  electionTimeLine: List(ElectionTimeLine),
});

// for key-value pair models
const KeyValue = Record({
  key: String(),
  value: String(),
});

// election data with config
const ElectionWithConfig = Record({
  id: String(),
  name: String(),
  moduleId: String(),
  electionConfig: List(KeyValue),
});

export {
  Election,
  ElectionWithConfig,
}