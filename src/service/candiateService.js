import { ServerError , ApiError } from 'Errors';
import CandidateRepo from '../repository/candidate';
import {CandidateManager}  from 'Managers'
import _ from 'lodash';



// const getCandidateListByNominationId = async (req) => {
//     const nomination_id = req.params.nominationId;
//     console.log('candidate service js');
//     return Candidate.getCandidateListByNomination(nomination_id);
// }

const getCandidateListByNominationId = async (req) => {
    const nomination_id = req.params.nominationId;
    const candidates = await CandidateRepo.getCandidateListByNomination( nomination_id );
    console.log("------------>>",candidates);
    if(!_.isEmpty(candidates)){
      return CandidateManager.mapToCandidateModel(candidates)
    }else {
      throw new ApiError("Candidates not found");
    }
  };

export default {
    getCandidateListByNominationId,
}