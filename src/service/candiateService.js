import { ServerError , ApiError } from 'Errors';
import CandidateRepo from '../repository/candidate';
import {CandidateManager}  from 'Managers'
import _ from 'lodash';



const getCandidateListByNominationId = async (req) => {
    try {
      const nomination_id = req.params.nominationId;
      const candidates = await CandidateRepo.getCandidateListByNomination( nomination_id );

      if(!_.isEmpty(candidates)){
        return CandidateManager.mapToCandidateModel(candidates)
      }else {
        throw new ApiError("Candidates not found");
      }
    }catch (e){
      throw new ServerError("server error");
    }
    
  };

export default {
    getCandidateListByNominationId,
}