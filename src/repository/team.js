import { DBError } from 'Errors';
// import { DbConnection } from './teamDataSource';
import { DbConnection } from './dataSource';



const TEAM_SELECT_QUERY = `SELECT 
t.ID as team_id,
t.NAME as team_name,
t.SYMBOL as team_symbol,
t.FAX as team_fax,
t.NAME_OF_AUTHORIZED_MEMBER as team_name_of_authorized_member,
t.ADDRESS_OF_AUTHORIZED_MEMBER as team_address_of_authorized_member,
cn.ID as contact_id,
cn.CONTACT_NO as contact_number
FROM TEAM t
	LEFT JOIN CONTACT_NUMBER cn on t.ID = cn.TEAM_ID
WHERE t.ID = :team_id`;
const ALL_TEAM_SELECT_QUERY = `SELECT 
ID as team_id,
TEAM_NAME as team_name
FROM TEAM_CONFIG`;

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

const fetchAllTeams = () => {
    return DbConnection()
        .query(ALL_TEAM_SELECT_QUERY,
            {
                replacements: {},
                type: DbConnection().QueryTypes.SELECT,
            }).then((response) => {
                return response;
            })
            .catch((error) => {
                throw new DBError(error);
            });
};




// const TEAM_UPDATE_QUERY = `UPDATE TEAM
// SET
//     name=:name, type=:type, name_of_secratery=:name_of_secratery, address_of_secratery=:address_of_secratery
// WHERE
//     id= :id`;


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
  fetchAllTeams
    // updateTeam,
}