import _ from 'lodash';
import Candidate from '../repository/candidate';

const getCandidateListByNominationId = async (req) => {
    const nomination_id = req.params.nomination_id;
    console.log('candidate service js');
    return Candidate.getCandidateListByNomination(nomination_id);
}

export default {
    getCandidateListByNominationId,
}