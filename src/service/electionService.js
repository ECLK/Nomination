/**
 * Created by Yujith on 11/15/18.
 */
import _ from 'lodash';
import { ServerError } from 'Errors';
import Election from '../repository/election';
import ElectionRepo from '../repository/election';
import {UserManager}  from 'Managers'
const uuidv4 = require('uuid/v4');


const saveNominationById = async (req) => {
  try {
    
    var nomi_data = req.body.nominations;
    const status = "Created-new.";
    var i=0;
    var nominations = []; 
       for (var {division_id: division_id, election_id: election_id,team_id: team_id} of nomi_data) {
          const id = uuidv4();
           nominations[i] = {'nomination_id':id, 'team_id':team_id,'election_id':election_id, 'division_id':division_id, 'status':status};
         i++;
       }
    console.log("--->",nominations);
    return ElectionRepo.createNominationRows(nominations);
  }catch (e){
    throw new ServerError("server error");
  }
};


const getUserByUserId = async (req) => {
  const uid = req.params.uid;
  return Election.fetchUserById( uid );
};

export default {      
  getUserByUserId,
  saveNominationById,
}