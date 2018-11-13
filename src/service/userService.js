/**
 * Created by ananda on 11/4/18.
 */
import _ from 'lodash';
import User from '../repository/user';
import {UserManager}  from 'Managers'


const getUserByUserId = async (req) => {
  const uid = req.params.uid;
  return User.fetchUserById( uid );
};

export default {
  getUserByUserId,
}