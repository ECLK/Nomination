/**
 * Created by ananda on 11/4/18.
 */
import _ from 'lodash';
import User from '../repository/User';
import {UserManager}  from 'Managers'


const updateUserByUserId = async (req) => {
  const id = req.body.id;
  const name = req.body.name;
  return User.createUser( id, name);
};

const getUserByUserId = async (req) => {
  const uid = req.params.uid;
  return User.fetchUserById( uid );
};

export default {
  getUserByUserId,
  updateUserByUserId,
}