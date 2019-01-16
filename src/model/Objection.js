
import {Record} from 'typed-immutable';

export const Objection =  Record({
  id: String(),
  description: String(),
  created_date: Number(),
  created_by: String(),
  created_by_team_id: String(),
  nomination_id: String(),
});
