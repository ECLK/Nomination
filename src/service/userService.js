import { ServerError , ApiError } from 'Errors';
import _ from 'lodash';
import {UserManager}  from 'Managers'
import UserRepo from '../repository/user';

import SampleTransactionService  from '../repository/sampleTransaction'



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
    return UserManager.mapToUserModel(users);
  }else {
    throw new ApiError("User not found");
  }
};

/**
 * TODO : Take this as a sample use for real world scenario buy @Udith
 * @param req
 * @returns {Promise.<void>}
 */
const updateAsTransaction = async (req) => {

  try {
    const objectionId = '1234';
    const ObjectionDes = 'des for objection';
    const nominationId = '234';
    const nominationStatus = 'APPROVE';
    await SampleTransactionService.saveRecordsToDB({
      objectionId,
      ObjectionDes,
      nominationId,
      nominationStatus,
    });
  }catch (e){
    throw new ServerError("server error");
  }
};

export default {
  getUserByUserId,
  updateUserByUserId,
  updateAsTransaction,
}