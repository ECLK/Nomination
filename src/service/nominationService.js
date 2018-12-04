import Nomination from '../repository/nomination';

const getNominationByTeamId = async (req) => {
    const team_id = req.params.team_id;
    const election_id = req.params.election_id;
    return Nomination.fetchNominationByTeam(team_id, election_id);
};

// const updateNominationCandidates = async (req) => {
//     const candidate_id = req.body.candidate_id;
//     const nic = req.body.nic;
//     const name = req.body.name;
//     const occupation = req.body.occupation;
//     const address = req.body.address;
//     const nomination_id = req.body.nomination_id;
//     return Candidate.UpdateCandidate(candidate_id, nic, name, occupation, address, nomination_id);
//     //const name = req.body.name;
//     //return User.createUser( id, name);
// };


export default {
    getNominationByTeamId,
}