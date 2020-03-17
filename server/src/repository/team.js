import { DBError } from 'Errors';
import { DbConnectionTeam } from './teamDataSource';
import { DbConnection } from './dataSource';



const TEAM_SELECT_QUERY = `SELECT 
                            ID as team_id,
                            PARTY_NAME as team_name,
                            ABBREVIATION as team_abbreviation,
                            PARTY_TYPE as team_type,
                            SECRETARY_NAME as team_secretary_name,
                            TITLE as team_title,
                            ADDRESS as team_address,
                            APPROVED_SYMBOL as team_approved_symbol,
                            FILE_ORIGINAL_NAME as team_file_original_name,
                            FILE_PATH as team_file_path,
                            FILE_NAME as team_file_name,
                            PHONE as team_phone,
                            FAX as team_fax
                            FROM TEAM 
                            WHERE ID = :team_id`;
const ALL_TEAM_SELECT_QUERY = `SELECT 
                                ID AS team_id,
                                PARTY_NAME AS team_name,
                                ABBREVIATION AS team_abbrevation,
                                PARTY_TYPE AS team_party_type,
                                APPROVED_SYMBOL AS team_symbol
                                FROM TEAM WHERE STATUS <> "DELETED"`;
const ALL_TEAM_SELECT_QUERY_BY_TEAM_TYPE = `SELECT 
                                ID AS team_id,
                                PARTY_NAME AS team_name,
                                ABBREVIATION AS team_abbrevation,
                                PARTY_TYPE AS team_party_type
                                FROM TEAM WHERE PARTY_TYPE=:partyType`;


const fetchTeamById = (team_id) => {
    const params = { team_id: team_id };
    return DbConnectionTeam()
        .query(TEAM_SELECT_QUERY,
            {
                replacements: params,
                type: DbConnectionTeam().QueryTypes.SELECT,
            }).catch((error) => {
                throw new DBError(error);
            });
};

const fetchAllTeams = () => {
    return DbConnectionTeam()
        .query(ALL_TEAM_SELECT_QUERY,
            {
                replacements: {},
                type: DbConnectionTeam().QueryTypes.SELECT,
            }).then((response) => {
                return response;
            })
            .catch((error) => {
                throw new DBError(error);
            });
};

const fetchAllTeamsByTeamType = (partyType) => {
    const params = { partyType: partyType };
    return DbConnectionTeam()
        .query(ALL_TEAM_SELECT_QUERY_BY_TEAM_TYPE,
            {
                replacements: params,
                type: DbConnectionTeam().QueryTypes.SELECT,
            }).then((response) => {
                return response;
            })
            .catch((error) => {
                throw new DBError(error);
            });
};


const TEAM_INSERT_QUERY = `INSERT INTO TEAM 
  (ID, PARTY_NAME,PARTY_TYPE, ABBREVIATION, SECRETARY_NAME, FILE_PATH,FILE_ORIGINAL_NAME,FILE_NAME, TITLE, CREATED_BY, CREATED_AT, UPDATED_AT, ADDRESS,APPROVED_SYMBOL,PHONE,FAX) 
VALUES 
  (:id, :partyName,:partyType,:abbreviation, :secretaryName, :filePath, :originalName, :filename, :title, :createdBy, :createdAt, :updatedAt , :address, :approvedSymbol, :phone, :fax)`;
 
const insertTeam = (teamData) => {
	const params = teamData;
	return DbConnectionTeam()
		.query(TEAM_INSERT_QUERY,
			{
				replacements: params,
				type: DbConnectionTeam().QueryTypes.INSERT,
			}).then((results) => {
				return params;
			}).catch((error) => {
				console.log(error);
				throw new DBError(error);
			});
};


const TEAM_UPDATE_QUERY = `UPDATE TEAM SET 
                            PARTY_NAME = :partyName, 
                            PARTY_TYPE = :partyType, 
                            ABBREVIATION = :abbreviation, 
                            SECRETARY_NAME = :secretaryName, 
                            UPDATED_AT = :updatedAt, 
                            FILE_PATH = :filePath, 
                            FILE_ORIGINAL_NAME = :originalName,
                            FILE_NAME = :filename, 
                            TITLE = :title, 
                            ADDRESS = :address, 
                            APPROVED_SYMBOL = :approvedSymbol,
                            PHONE = :phone, 
                            FAX = :fax
                              WHERE 
                              ID = :id`;

const updateTeam = (paymentData) => {
	const params = paymentData;
	return DbConnectionTeam()
		.query(TEAM_UPDATE_QUERY,
			{
				replacements: params,
				type: DbConnectionTeam().QueryTypes.UPDATE,
			}).then((results) => {
				return params;
			}).catch((error) => {
				throw new DBError(error);
			});
};

const TEAM_STATUS_UPDATE_QUERY = `UPDATE TEAM SET STATUS = "DELETED" WHERE ID = :partyId`;

const updateTeamStatus = (partyId) => {
	const params = { partyId: partyId };
	return DbConnectionTeam()
		.query(TEAM_STATUS_UPDATE_QUERY,
			{
				replacements: params,
				type: DbConnectionTeam().QueryTypes.UPDATE,
			}).then((results) => {
				return params;
			}).catch((error) => {
				throw new DBError(error);
			});
};

const TEAM_SELECT_QUERY_FROM_NOMINATION = `SELECT * FROM NOMINATION WHERE TEAM_ID=:team_id`;

const teamValidation = (team_id) => {
    const params = { team_id: team_id };
    return DbConnection()
        .query(TEAM_SELECT_QUERY_FROM_NOMINATION,
            {
                replacements: params,
                type: DbConnection().QueryTypes.SELECT,
            }).catch((error) => {
                throw new DBError(error);
            });
};



export default {
  fetchTeamById,
  fetchAllTeams,
  fetchAllTeamsByTeamType,
  insertTeam,
  updateTeam,
  updateTeamStatus,
  teamValidation
}