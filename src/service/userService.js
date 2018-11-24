/**
 * Created by ananda on 11/4/18.
 */
import _ from 'lodash';
import User from '../repository/user';
import {UserManager}  from 'Managers'


const updateUserByUserId = async (req) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    return User.createUser( id, name);
  }catch (e){
    throw new ServerError("server error");
  }
};

const getUserByUserId = async (req) => {
  const uid = req.params.uid;
  return User.fetchUserById( uid );
};

export default {
  getUserByUserId,
  updateUserByUserId,
}