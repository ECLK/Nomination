import {ServerError, ApiError} from 'Errors';
import ModuleRepo from '../repository/module';
import {ModuleManager} from 'Managers';
import _ from 'lodash';
const uuidv4 = require('uuid/v4');

const updateModuleByModuleId = async (req) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const modules = [{'ID': id, 'NAME': name}];
        return ModuleRepo.insertModules(modules);
    } catch (e) {
        throw new ServerError("server error");
    }
};

const getModuleByModuleId = async (req) => {
    const uid = req.params.moduleId;
    const modules = await ModuleRepo.fetchModuleById(uid);
    if (!_.isEmpty(modules)) {
        return ModuleManager.mapToModuleModel(modules);
    } else {
        throw new ApiError("Module4 not found");
    }
};

const getModulesByStatus = async (req) => {
    const status = req.params.status;
    const modules = await ModuleRepo.fetchModuleSByStatus(status);
    try {
        if (!_.isEmpty(modules)) {
            return ModuleManager.mapToModuleModel(modules);
        } else {
            throw new ApiError("Module7 not found");
        }
    } catch (e) {
        throw new ServerError("server error");
    }

};
const getColumnNamesFromCandidateConfig = async (req) => {

    const modules = await ModuleRepo.fetchColumnNamesFromCandidateConfig();

    try {

        if (!_.isEmpty(modules)) {
            return modules;
        } else {
            throw new ApiError("Module7 not found");
        }
    } catch (e) {
        throw new ServerError("server error");
    }

};
const InsertDivisionConfig = async (req) => {
    try {
        await ModuleRepo.UpdateElectionModule(req.body.Division_Comman_Name,req.body.MODULE_ID);
        var list = [];
        var array=req.body.data;
        for(var i=0;i<req.body.data.length;i++){
            list[i]={'ID':uuidv4(), 'NAME':array[i].Division_name, 'CODE':array[i].Division_code, 'NO_OF_CANDIDATES':array[i].no_of_candidate, 'MODULE_ID':req.body.MODULE_ID}
        }
        await ModuleRepo.InsertTodivisionConfig(list);
    } catch (e) {
        throw new ServerError("server error");
    }

};
const insertTOElectionModuleConfigData = async (req) => {
    try {
        const election_module_id = req.body.election_module_id;
        const election_module_name = req.body.election_module_name;
        const array = req.body.DATA;
        const list=[];
        ModuleRepo.insertToElectionModule(election_module_id,election_module_name);
        for(var i =0;i<array.length;i++){
            list[i]={VALUE:array[i].DATA, ELECTION_MODULE_CONFIG_ID:array[i].ID, MODULE_ID:election_module_id}
        }

        ModuleRepo.insertToElectionModuleConfigData(list);
    }catch (e){
        throw new ServerError("server error");
    }
};
const GetFromElectionModuleConfig = async (req) => {
    try {

        const election = await ModuleRepo.fetchElectionModuleConfig();
        if(!_.isEmpty(election)){
            return election;
        } else {
            throw new ApiError("Election not found");
        }
    } catch (error) {
        console.log(error);
        throw new ServerError("Server error", HTTP_CODE_404);
    }
};
const getElectionModuleConfigDataById = async (req) => {
    try {
        const id = req.params.election_module_id;
        const name = await ModuleRepo.fetchElectionModuleById(id);
        const result = await ModuleRepo.fetchElectionModuleConfigByModuleId(id);
        if(!_.isEmpty(result)){
            var final={election_module_id:id,election_module_name:name[0].NAME};
            for(var i=0;i<result.length;i++){
                final[result[i].KEY_NAME]=result[i].VALUE;
            }
            return final;
        } else {
            throw new ApiError("Election not found");
        }

    } catch (error) {
        throw new ServerError("Server error", HTTP_CODE_404);
    }
};
export default {
    getModuleByModuleId,
    updateModuleByModuleId,
    getModulesByStatus,
    getColumnNamesFromCandidateConfig,
    InsertDivisionConfig,
    insertTOElectionModuleConfigData,
    GetFromElectionModuleConfig,
    getElectionModuleConfigDataById


}