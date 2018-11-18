import { DBError } from 'Errors';
import { DbConnection } from './dataSource';

const TEAM_SELECT_QUERY = `SELECT * FROM team WHERE id = :team_id`;

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


export default {
    getTeamInfo,
}