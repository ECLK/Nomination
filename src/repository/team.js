import { DBError } from 'Errors';
import { DbConnection } from './teamDataSource';

const TEAM_SELECT_QUERY = `SELECT ID AS TEAM_ID,
                           NAME AS TEAM_NAME,
                           SYMBOL AS TEAM_SYMBOL,
                           TELEPHONE AS TEAM_TELEPHONE,
                           FAX AS TEAM_FAX,
                           NAME_OF_AUTHORIZED_MEMBER AS TEAM_NAME_OF_AUTHORIZED_MEMBER,
                           ADDRESS_OF_AUTHORIZED_MEMBER AS TAEM_ADDRESS_OF_AUTHORIZED_MEMBER
                           FROM TEAM WHERE ID = :team_id`;

// const TEAM_UPDATE_QUERY = `UPDATE TEAM
// SET
//     name=:name, type=:type, name_of_secratery=:name_of_secratery, address_of_secratery=:address_of_secratery
// WHERE
//     id= :id`;

const fetchTeamById = (team_id) => {
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


/**
 * To be refactor and use for team update
 */
// const updateTeam = (id, name, type, name_of_secratery, address_of_secratery) => {
//     const params = { id: id, name: name, type: type, name_of_secratery: name_of_secratery, address_of_secratery: address_of_secratery };
//     return DbConnection()
//         .query(TEAM_UPDATE_QUERY,
//             {
//                 replacements: params,
//                 type: DbConnection().QueryTypes.UPDATE,
//             }).catch((error) => {
//                 throw new DBError(error);
//             });
// };


export default {
  fetchTeamById,
    // updateTeam,
}