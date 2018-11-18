import { DBError } from 'Errors';
import { DbConnection } from './dataSource';

const TEAM_SELECT_QUERY = `SELECT * FROM team WHERE id = :team_id`;

const TEAM_UPDATE_QUERY = `UPDATE team 
SET 
    name=:name, type=:type, name_of_secratery=:name_of_secratery, address_of_secratery=:address_of_secratery 
WHERE 
    id= :id`;

const getTeamInfo = (team_id) => {
    const params = { team_id: team_id };
    return DbConnection()
        .query(TEAM_SELECT_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.SELECT,
            }).catch((error) => {
                throw new DBError(error);
            });
};

const updateTeam = (id, name, type, name_of_secratery, address_of_secratery) => {
    const params = { id: id, name: name, type: type, name_of_secratery: name_of_secratery, address_of_secratery: address_of_secratery };
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
    getTeamInfo,
    updateTeam,
}