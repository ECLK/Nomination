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
        console.log("====", e);
        throw new ServerError("server error");
    }

};
const getColumnnamesFromCandidate_configTabel = async (req) => {

    const modules = await ModuleRepo.fetchColumnnamesFromCandidateConfigTabel();

    try {

        if (!_.isEmpty(modules)) {
            modules.forEach(function(element) {
                console.log(element);
            });
            return modules; //ModuleManager.mapToCandidateConfigColumnNames(modules);
        } else {
            throw new ApiError("Module7 not found");
        }
    } catch (e) {
        console.log(e);
        throw new ServerError("server error");
    }

};
const InsertTodivisionConfig = async (req) => {
    try {
        await ModuleRepo.UpdateElectionModule(req.body.Division_Comman_Name,req.body.MODULE_ID);
        var list = [];
        var array=req.body.data;
        for(var i=0;i<req.body.data.length;i++){
            list[i]={'ID':uuidv4(), 'NAME':array[i].Division_name, 'CODE':array[i].Division_code, 'NO_OF_CANDIDATES':array[i].no_of_candidate, 'MODULE_ID':req.body.MODULE_ID}
        }
        console.log(list);
        await ModuleRepo.InsertTodivisionConfig(list);
    } catch (e) {
        console.log(e);
        throw new ServerError("server error");
    }

};

export default {
    getModuleByModuleId,
    updateModuleByModuleId,
    getModulesByStatus,
    getColumnnamesFromCandidate_configTabel,
    InsertTodivisionConfig
}