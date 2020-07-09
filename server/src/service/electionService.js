import _ from 'lodash';
import { ServerError , ApiError } from 'Errors';
import ElectionRepo from '../repository/election';
import { HTTP_CODE_404 } from '../routes/constants/HttpCodes';
import {ElectionManager}  from 'Managers';

const getElectionByIdWithTimelineData = async (req) => {
    try {
        const id = req.params.electionId;
        const election = await ElectionRepo.fetchElectionByIdWithTimelineData(id);
        if(!_.isEmpty(election)){
            return ElectionManager.mapToElectionModelWithTimeline(election);
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw new ServerError("Server error", HTTP_CODE_404);
    }
};

const insertTest = async (req) => {
    try {
        const election_module_id = req.body.election_module_id;
        const election_module_name = req.body.election_module_name;
        const authority = req.body.authority;
        const calculation_type = req.body.calculation_type;
        const Deposite_payment = req.body.Deposite_payment;
        const objection_availability = req.body.objection_availability;
        const create_alliance = req.body.create_alliance;
        const election_module_status = req.body.election_module_status;
        const modules = [{'election_module_id':election_module_id, 'election_module_name':election_module_name,'authority':authority, 'calculation_type':calculation_type,'Deposite_payment':Deposite_payment, 'objection_availability':objection_availability,'create_alliance':create_alliance, 'election_module_status':election_module_status}];
        console.log(req);
        //return ElectionRepo.createTest(modules);// db table not there ----------------
    }catch (e){
        console.log("jjksjdkfskfk",e);
        throw new ServerError("server error");
    }
};
const GetElectionConfig = async (req) => {
    try {

        //const election = await ElectionRepo.fetchElectionConfig();// DB table not there----------------
        /*if(!_.isEmpty(election)){
            return "GetElectionConfig";//ElectionManager.mapToElectionModelWithTimeline(election);
        } else {
            throw new ApiError("Election not found");
        }*/
    } catch (error) {
        throw new ServerError("Server error", HTTP_CODE_404);
    }
};

const getElectionConfigById = async (req) => {
    try {
        const id = req.params.election_module_id;
        console.log(id);
      //  const ElectionConfig = await ElectionRepo.fetchElectionConfigById(id);//DB table not there -------------------
        /*if(!_.isEmpty(election)){
            return ElectionManager.mapToElectionModelWithTimeline(election);
        } else {
            throw new ApiError("Election not found");
        }*/

    } catch (error) {

        throw new ServerError("Server error", HTTP_CODE_404);
    }
};

const getAllElections = async () => {
    try {
        const elections = await ElectionRepo.fetchAllElections();
        if(!_.isEmpty(elections)){
            return ElectionManager.mapToAllElection(elections);
        } else {
            // throw new ApiError("No Election found");
            return [];
        }
    } catch (error) {
        console.log("errorerrorerror",error);
        throw new ServerError("Server error", HTTP_CODE_404);
    }
}

//TODO: yujith, remove this after demo
const getElectionIdForDemo = async () => {
    try {
        const elections = await ElectionRepo.fetchLastElectionId();
        if(!_.isEmpty(elections)){
            return elections;
        } else {
            throw new ApiError("No Election found");
        }
    } catch (error) {
        console.log(error);
        throw new ServerError("Server error", HTTP_CODE_404);
    }
}


const getElectionsByStatus = async (req) => {
    try {
        const status = req.params.status;
        const elections = await ElectionRepo.fetchElectionsByStatus(status);
        console.log("elections",elections);
        if(!_.isEmpty(elections)){
            return ElectionManager.mapToElectionWithStatus(elections);
        } else {
            throw new ApiError("No Election found");
        }
    } catch (error) {
        console.log(error);
        throw new ServerError("Server error", HTTP_CODE_404);
    }
}

const getElectionsByStatusName = async (req) => {
    try {
        const status = req.params.status;
        const elections = await ElectionRepo.fetchElectionsByStatusName(status);
        if(!_.isEmpty(elections)){
            return ElectionManager.mapToElectionWithStatus(elections);
        } else {
            throw new ApiError("No Election found");
        }
    } catch (error) {
        console.log(error);
        throw new ServerError("Server error", HTTP_CODE_404);
    }
}

export default {
    getElectionByIdWithTimelineData,
    insertTest,
    GetElectionConfig,
    getElectionConfigById,
    getAllElections,
    getElectionsByStatus,
    getElectionsByStatusName,
    getElectionIdForDemo
}
