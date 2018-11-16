import { DBError } from 'Errors';
import { DbConnection } from './dataSource';


const TEAM_DATA_SELECT_QUERY = `SELECT team_name,team_type,name_of_secratery,address_of_secratery,team_id AS id FROM Teams WHERE team_id = :id`;
const TEAM_UPDATE_QUERY = `UPDATE Teams SET team_name=:team_name, team_type=:team_type, name_of_secratery=:name_of_secratery, address_of_secratery=:address_of_secratery WHERE team_id= :id`;
                          

const fetchTeamById = (userId) => {
  const params = { id: userId };
  console.log("params",params);
  return DbConnection()
    .query(TEAM_DATA_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
      throw new DBError(error);
    });
};

const updateTeam = (id, name,team_type,name_of_secratery,address_of_secratery) => {
  const params = { id: id, team_name : name,team_type: team_type, name_of_secratery : name_of_secratery,address_of_secratery:address_of_secratery};
  return DbConnection()
    .query(TEAM_UPDATE_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.UPDATE,
      }).catch((error) => {
      throw new DBError(error);
    });
};


export default {
  fetchTeamById,updateTeam
}