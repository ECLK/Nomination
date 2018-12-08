import { DBError } from 'Errors';
import { DbConnection } from './dataSource';


const SUPPORT_DOC_BY_NOMINATION_SELECT_QUERY = `SELECT ID AS SUPPORT_DOC_ID,
                                              FILE_PATH AS SUPPORT_DOC_FILE_PATH,
                                              SUPPORT_DOC_CONFIG_DATA_ID AS SUPPORT_DOC_SUPPORT_DOC_CONFIG_DATA_ID,
                                              NOMINATION_ID AS SUPPORT_DOC_NOMINATION_ID
                                             FROM NOMINATION_SUPPORT_DOC WHERE NOMINATION_ID = :nominationId`;

const SUPPORT_DOC_INSERT_QUERY = `INSERT INTO NOMINATION_SUPPORT_DOC (ID,SUPPORT_DOC_CONFIG_DATA_ID,FILE_PATH, NOMINATION_ID) 
                                VALUES (:id,:supportDocConfDataId,:filePath,:nominationId )`

const SUPPORT_DOC_UPDATE_QUERY = `UPDATE NOMINATION_SUPPORT_DOC 
                                SET 
                                FILE_PATH = :filePath, SUPPORT_DOC_CONFIG_DATA_ID = :supportDocConfDataId
                                WHERE 
                                NOMINATION_ID = :nominationId`;

                                
const getSupportDocByNomination = (nominationId) => {
  const params = { nominationId: nominationId };
  console.log('support doc repository');
  return DbConnection()
    .query(SUPPORT_DOC_BY_NOMINATION_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
        throw new DBError(error);
      });
}

const saveSupportDocs = (supportDocsData) => {
  const params = supportDocsData;
  return DbConnection()
    .query(SUPPORT_DOC_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).catch((error) => {
        throw new DBError(error);
      });
};

const updateSupportDocs = (supportDocsData) => {
  const params = supportDocsData;
  console.log("UUUUUUUUUUUUUU",params);
  return DbConnection()
    .query(SUPPORT_DOC_UPDATE_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.UPDATE,
      }).catch( (error) => {
        throw new DBError(error);
      });
};


export default {
  getSupportDocByNomination,
  saveSupportDocs,
  updateSupportDocs
}