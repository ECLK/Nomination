import { DBError } from 'Errors';
import { DbConnection } from './dataSource';

const OBJECTIONS_CREATED_BY_TEAM_SELECT_QUERY = `SELECT
    o.ID AS objection_id,
    o.DESCRIPTION AS objection_description,
    o.CREATED_AT AS objection_created_at,
    o.CREATED_BY AS objection_created_by,
    o.CREATED_BY_TEAM_ID AS objection_created_by_team_id,
    o.NOMINATION_ID AS objection_nomination_id
FROM
    OBJECTION o
    LEFT JOIN NOMINATION n ON n.ID = o.NOMINATION_ID
WHERE
    o.CREATED_BY_TEAM_ID = :team_id
    AND n.ELECTION_ID = :election_id`;

const fetchObjectionCreatedByTeam = (election_id, team_id) => {
    const params = { team_id: team_id, election_id: election_id };
    return DbConnection()
        .query(OBJECTIONS_CREATED_BY_TEAM_SELECT_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.SELECT,
            }).catch((error) => {
                throw new DBError(error);
            });
};


export default{
    fetchObjectionCreatedByTeam,
}
