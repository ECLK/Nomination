import { ServerError , ApiError } from 'Errors';
import UserRepo from '../repository/User';
import {UserManager}  from 'Managers'
import _ from 'lodash';


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
  const uid = req.params.userId;
  const users = await UserRepo.fetchUserById( uid );
  if(!_.isEmpty(users)){
    return UserManager.mapToUserModel(users)
  }else {
    throw new ApiError("User not found");
  }
};


export default {
   getUserByUserId,
   updateUserByUserId,
}