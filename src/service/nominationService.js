import  Nomination  from '../repository/nomination';

const getNominationByTeamId = async (req) => {
    console.log("llllllllllllooooooooooooooooo");
    const team_id = req.params.team_id;
    const election_id = req.params.election_id;
    return Nomination.FetchNominationByTeam( team_id, election_id);
  };

  export default {
      getNominationByTeamId,
  }