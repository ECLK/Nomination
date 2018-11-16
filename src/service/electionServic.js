/**
 * Created by Yujith on 11/15/18.
 */
import _ from 'lodash';
import Election from '../repository/election';
import {UserManager}  from 'Managers'


const saveElectionById = async (req) => {
  const id = req.body.id;
  const name = req.body.name;
  return Election.createNominationRows( id, name);
};

const getUserByUserId = async (req) => {
  const uid = req.params.uid;
  return Election.fetchUserById( uid );
};

export default {
  getUserByUserId,
  saveElectionById,
}