import { ServerError , ApiError } from 'Errors';
import TeamRepo from '../repository/team';
import {TeamManager}  from 'Managers';
import _ from 'lodash';
import {HTTP_CODE_404,HTTP_CODE_403} from '../routes/constants/HttpCodes';
const uuidv4 = require('uuid/v4');



const getTeamById = async (req) => {
  try {
    const teamId = req.params.teamId;
    const teams = await TeamRepo.fetchTeamById( teamId );

    if(!_.isEmpty(teams)){
      return TeamManager.mapToTeamModel(teams)
    }else {
      throw new ApiError("Team not found",HTTP_CODE_404);
    }
  }catch (e){
    throw new ServerError("server error");
  }
  
};

//Get all teams
const getAllTeams = async (req) => {
  try {
    const teams = await TeamRepo.fetchAllTeams();
    if(!_.isEmpty(teams)){
      return teams;
    }else {
      return [];
    }
  }catch (e){
    console.log(e);
    throw new ServerError("server error");
  }
  
};

//Get all teams by team type
const getAllTeamsByTeamType = async (req) => {
  try {
    const teams = await TeamRepo.fetchAllTeamsByTeamType(req.params.teamType);
    if(!_.isEmpty(teams)){
      return teams;
    }else {
      return [];
    }
  }catch (e){
    console.log(e);
    throw new ServerError("server error");
  }
};

//Save payment details for a particular nomination
const createTeam = async (req) => {
	try {
		const id = uuidv4();
		const partyName = req.body.partyName;
    const partyType = req.body.partyType;
    const secretaryName = req.body.secretaryName;
    const title = req.body.title;
    const address = req.body.address;
		const updatedAt = req.body.updatedAt;
		const createdAt = req.body.createdAt;
		const createdBy = req.body.createdBy;
		const abbreviation = req.body.abbreviation;
		const approvedSymbol = req.body.approvedSymbol;
    const phoneList = req.body.phoneList;
    var phone = phoneList.map( function( el ){ 
      return el.phone; 
     }).join();
    const faxList = req.body.faxList;
    var fax = faxList.map( function( el ){ 
      return el.fax; 
     }).join();
    const filePath = req.body.filePath;
    const filename = req.body.fileName;
    const originalname = req.body.originalname;
    const teamData = { 'id': id, 
                        'partyName': partyName, 
                        'partyType': partyType,
                        'abbreviation': abbreviation, 
                        'address': address, 
                        'approvedSymbol': approvedSymbol, 
                        'secretaryName': secretaryName, 
                        'title': title, 
                        'updatedAt': updatedAt, 
                        'createdAt': createdAt, 
                        'createdBy': createdBy, 
                        'filePath': filePath,
                        'phone': phone,
                        'fax': fax,
                        'originalName':originalname,
                        'filename':filename 
                      };
		await TeamRepo.insertTeam(teamData);
		return teamData;
	} catch (e) {
		throw e;
	}
};

//Update party details for a particular party
const updateTeamById = async (req) => {
	try {
    const partyId = req.params.teamId;
		const partyName = req.body.partyName;
    const partyType = req.body.partyType;
    const secretaryName = req.body.secretaryName;
    const title = req.body.title;
    const address = req.body.address;
		const updatedAt = req.body.updatedAt;
		const createdAt = req.body.createdAt;
		const createdBy = req.body.createdBy;
		const abbreviation = req.body.abbreviation;
		const approvedSymbol = req.body.approvedSymbol;
    const phoneList = req.body.phoneList;
    var phone = phoneList.map( function( el ){ 
      return el.phone; 
     }).join();
    const faxList = req.body.faxList;
    var fax = faxList.map( function( el ){ 
      return el.fax; 
     }).join();
    const filePath = req.body.filePath;
    const filename = req.body.fileName;
    const originalname = req.body.originalname;
    const teamData = { 'id': partyId, 
                        'partyName': partyName, 
                        'partyType': partyType,
                        'abbreviation': abbreviation, 
                        'address': address, 
                        'approvedSymbol': approvedSymbol, 
                        'secretaryName': secretaryName, 
                        'title': title, 
                        'updatedAt': updatedAt, 
                        'createdAt': createdAt, 
                        'createdBy': createdBy, 
                        'filePath': filePath,
                        'phone': phone,
                        'fax': fax,
                        'originalName':originalname,
                        'filename':filename 
                      };
		await TeamRepo.updateTeam(teamData);
		return teamData;
	} catch (e) {
		throw e;
	}
};

//Delete party details for a particular party
const deletePartyById = async (req) => {
	try {
    const partyId = req.params.teamId;
    const partyExist = await TeamRepo.teamValidation(partyId);
    if(_.isEmpty(partyExist)){
      await TeamRepo.updateTeamStatus(partyId);
      return partyId;
    }else{
      throw new ApiError("Sorry, This party already been used!",HTTP_CODE_403);
    }
		
	} catch (e) {
		throw e;
	}
};



export default {
    getTeamById,
    getAllTeams,
    getAllTeamsByTeamType,
    createTeam,
    updateTeamById,
    deletePartyById
}