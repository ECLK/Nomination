
import {Record} from 'typed-immutable';

export const Election =  Record({
  id:  String(),
  team_id: String(),
  election_id:  String(),
  division_id: String(),
  created: String(),
});