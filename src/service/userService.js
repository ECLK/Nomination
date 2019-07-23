import { ServerError , ApiError } from 'Errors';
import _ from 'lodash';
const uuidv4 = require('uuid/v4');
import {UserManager}  from 'Managers'
import UserRepo from '../repository/user';

import SampleTransactionService  from '../repository/sampleTransaction'



const updateUserByUserId = async (req) => {
  console.log("gggggggggggggg",req.body);
  try {
    let userId = req.params.userId;
    console.log("hhhhh", req.params);
    if(userId !== undefined){
      const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const party = req.body.party;

    const users = {'id':id, 'name':name, 'email':email,'party':party};
    return UserRepo.updateUser(users);

    }else{
      userId = uuidv4();
      const name = req.body.name;
      const email = req.body.email;
      const party = req.body.party;
      const users = {'id':userId, 'name':name, 'email':email,'party':party};
      return UserRepo.createUser(users);

    }
    
  }catch (e){
    console.log(e);
    throw new ServerError("server error");
  }
};

const getUserByUserId = async (req) => {
  try {
  const uid = req.params.userId;
  const users = await UserRepo.fetchUserById( uid );
  if(!_.isEmpty(users)){
    return UserManager.mapToUserModel(users);
  }else {
    throw new ApiError("User not found");
  }
  }catch (e){
    console.log(e);
    throw new ServerError("server error");
  }
};

const getAllUsers = async (req) => {
  try {
      const users = await UserRepo.fetchAllhUsers();
    if(!_.isEmpty(users)){
      return UserManager.mapToAllUserModel(users);
    }else {
      throw new ApiError("User not found");
    }
    }catch (e){
      console.log(e);
      throw new ServerError("server error");
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
  getAllUsers
}