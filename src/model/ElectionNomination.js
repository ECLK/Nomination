
import {Record} from 'typed-immutable';

export const ElectionNomination =  Record({
  id: String(),
  status: String(),
  team_id: String(),
  election_id: String(),
  division_config_data_id: String(),
});
