import { ServerError , ApiError } from 'Errors';
import ModuleRepo from '../repository/module';
import {ModuleManager}  from 'Managers';
import _ from 'lodash';


const updateModuleByModuleId = async (req) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const modules = [{'ID':id, 'NAME':name}];
    return ModuleRepo.insertModules(modules);
  }catch (e){
    throw new ServerError("server error");
  }
};

const getModuleByModuleId = async (req) => {
  const uid = req.params.moduleId;
  const modules = await ModuleRepo.fetchModuleById( uid );
  if(!_.isEmpty(modules)){
    return ModuleManager.mapToModuleModel(modules);
  }else {
    throw new ApiError("Module not found");
  }
};

export default {
  getModuleByModuleId,
  updateModuleByModuleId,
}