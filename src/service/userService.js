import { ServerError } from 'Errors';
import UserRepo from '../repository/User';
import {UserManager}  from 'Managers'


const updateUserByUserId = async (req) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const users = [{'ID':id, 'NAME':name}];
    return UserRepo.insertUsers(users);
  }catch (e){
    throw new ServerError("server error");
  }
};

const getUserByUserId = async (req) => {
  const uid = req.params.uid;
  return UserRepo.fetchUserById( uid );
};

export default {
  getUserByUserId,
  updateUserByUserId,
}