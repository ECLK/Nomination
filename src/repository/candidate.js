import { DBError } from 'Errors';
import { DbConnection } from './dataSource';

const CANDIDATE_INSERT_QUERY = `INSERT INTO Candidate (candidate_id,name,nic,address,occupation, nomination_id) 
                                VALUES (:candidate_id,:nic,:name,:occupation,:address,:nomination_id )`;

const UpdateCandidate = (candidate_id,nic,name,occupation,address,nomination_id) => {
    
    const params = {  
        candidate_id:candidate_id,
        nic:nic,
        name:name,
        occupation:occupation,
        address:address,
        nomination_id:nomination_id
    };
    return DbConnection()
      .query(CANDIDATE_INSERT_QUERY,
        {
          replacements: params,
          type: DbConnection().QueryTypes.INSERT,
        }).catch((error) => {
        throw new DBError(error);
      });
  };

export default{
    UpdateCandidate,

}