import { DBError } from 'Errors';
import { DbConnection } from './dataSource';


const CANDIDATE_BY_NOMINATION_SELECT_QUERY = `SELECT ID AS CANDIDATE_ID,
                                              FULL_NAME AS CANDIDATE_FULL_NAME,
                                              PREFERRED_NAME AS CANDIDATE_PREFERRED_NAME,
                                              OCCUPATION AS CANDIDATE_OCCUPATION,
                                              NIC AS CANDIDATE_NIC,
                                              DATE_OF_BIRTH AS CANDIDATE_DATE_OF_BIRTH,
                                              GENDER AS CANDIDATE_GENDER,
                                              ADDRESS AS CANDIDATE_ADDRESS,
                                              ELECTORAL_DIVISION_NAME AS CANDIDATE_ELECTORAL_DIVISION_NAME,
                                              ELECTORAL_DIVISION_CODE AS CANDIDATE_ELECTORAL_DIVISION_CODE,
                                              COUNSIL_NAME AS CANDIDATE_COUNSIL_NAME,
                                              NOMINATION_ID AS CANDIDATE_NOMINATION_ID
                                             FROM CANDIDATE WHERE NOMINATION_ID = :nomination_id`;

const CANDIDATE_BY_CANDIDATE_ID_SELECT_QUERY = `SELECT ID AS CANDIDATE_ID,
                                              FULL_NAME AS CANDIDATE_FULL_NAME,
                                              PREFERRED_NAME AS CANDIDATE_PREFERRED_NAME,
                                              OCCUPATION AS CANDIDATE_OCCUPATION,
                                              NIC AS CANDIDATE_NIC,
                                              DATE_OF_BIRTH AS CANDIDATE_DATE_OF_BIRTH,
                                              GENDER AS CANDIDATE_GENDER,
                                              ADDRESS AS CANDIDATE_ADDRESS,
                                              ELECTORAL_DIVISION_NAME AS CANDIDATE_ELECTORAL_DIVISION_NAME,
                                              ELECTORAL_DIVISION_CODE AS CANDIDATE_ELECTORAL_DIVISION_CODE,
                                              COUNSIL_NAME AS CANDIDATE_COUNSIL_NAME,
                                              NOMINATION_ID AS CANDIDATE_NOMINATION_ID
                                             FROM CANDIDATE WHERE NOMINATION_ID = :nominationId AND ID = :candidateId`;

const CANDIDATE_INSERT_QUERY = `INSERT INTO CANDIDATE (ID, FULL_NAME, PREFERRED_NAME, NIC, DATE_OF_BIRTH, GENDER, ADDRESS, OCCUPATION, ELECTORAL_DIVISION_NAME, ELECTORAL_DIVISION_CODE, COUNSIL_NAME, NOMINATION_ID) 
                              VALUES (:id, :fullName,:preferredName, :nic, :dateOfBirth, :gender, :address,:occupation, :electoralDivisionName, :electoralDivisionCode, :counsilName , :nominationId)`;

// const UpdateCandidate = (candidate_id, nic, name, occupation, address, nomination_id) => {
//   const params = {
//     candidate_id: candidate_id,
//     nic: nic,
//     name: name,
//     occupation: occupation,
//     address: address,
//     nomination_id: nomination_id
//   };
//   return DbConnection()
//     .query(CANDIDATE_INSERT_QUERY,
//       {
//         replacements: params,
//         type: DbConnection().QueryTypes.INSERT,
//       }).catch((error) => {
//         throw new DBError(error);
//       });
// };

const getCandidateListByNomination = (nomination_id) => {
  const params = { nomination_id: nomination_id };
  console.log('candidate repository');
  return DbConnection()
    .query(CANDIDATE_BY_NOMINATION_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
        throw new DBError(error);
      });
}

const getCandidateByNomination = (params) => {
  return DbConnection()
    .query(CANDIDATE_BY_CANDIDATE_ID_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
        throw new DBError(error);
      });
}

const createCandidate = (candidateData) => {
  const params = candidateData;
  return DbConnection()
    .query(CANDIDATE_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).then((results) => {
       return params ;
      }).catch((error) => {
        throw new DBError(error);
      });
};

export default {
  getCandidateListByNomination,
  createCandidate,
  getCandidateByNomination,
}