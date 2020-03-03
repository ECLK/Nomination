import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';
const uuidv4 = require('uuid/v4');



const ALL_MODULE_SELECT_QUERY = `SELECT  
                                  EM.ID AS MODULE_ID,
                                  EM.NAME AS MODULE_NAME,
                                  EM.DIVISION_COMMON_NAME AS MODULE_DIVISION_COMMON_NAME,
                                  EM.CREATED_BY AS MODULE_CREATED_BY,
                                  EMA.STATUS AS MODULE_STATUS,
                                  EMA.APPROVED_AT AS MODULE_LAST_MODIFIED
                                  FROM ELECTION_MODULE EM LEFT JOIN ELECTION_MODULE_APPROVAL EMA
                                  ON EM.ID=EMA.MODULE_ID WHERE EMA.STATUS= :status ORDER BY EM.NAME`;
const MODULE_SELECT_QUERY = `SELECT 
                            em.ID AS MODULE_ID, 
                            em.NAME AS MODULE_NAME,
                            em.DIVISION_COMMON_NAME AS MODULE_DIVISION_COMMON_NAME,
                            em.CREATED_BY AS MODULE_CREATED_BY,
                            emcd.ELECTION_MODULE_CONFIG_ID AS MODULE_electionModuleConfigId,
                            emcd.VALUE AS MODULE_value,
                            dc.NAME AS MODULE_divisionName,
                            dc.CODE AS MODULE_divisionCode,
                            dc.NO_OF_CANDIDATES AS MODULE_noOfCandidates,
                            sdcd.SUPPORT_DOC_CONFIG_ID AS MODULE_supportDocConfigId,
                            ccd.CANDIDATE_CONFIG_ID AS MODULE_candidateConfigId,
                            ecd.ELIGIBILITY_CONFIG_ID AS MODULE_eligibilityConfigId,
                            ema.STATUS AS MODULE_approval_status,
                            ema.REVIEW_NOTE AS MODULE_reviewNote
                            FROM ELECTION_MODULE em LEFT JOIN ELECTION_MODULE_CONFIG_DATA emcd ON em.ID=emcd.MODULE_ID
                            LEFT JOIN DIVISION_CONFIG dc ON em.ID=dc.MODULE_ID
                            LEFT JOIN SUPPORT_DOC_CONFIG_DATA sdcd ON em.ID=sdcd.MODULE_ID
                            LEFT JOIN CANDIDATE_CONFIG_DATA ccd ON em.ID=ccd.MODULE_ID
                            LEFT JOIN ELIGIBILITY_CONFIG_DATA ecd ON em.ID=ecd.MODULE_ID
                            LEFT JOIN ELECTION_MODULE_APPROVAL ema ON ema.MODULE_ID=em.ID
                            WHERE em.ID = :id`;
const MODULE_INSERT_QUERY = `INSERT INTO ELECTION_MODULE (ID, NAME, DIVISION_COMMON_NAME, CREATED_BY, CREATED_AT, UPDATED_AT) 
                              VALUES (:id, :name,:divisionCommonName, :createdBy, UNIX_TIMESTAMP(), UNIX_TIMESTAMP())`;
const MODULE_APPROVE_QUERY = `INSERT INTO ELECTION_MODULE_APPROVAL (ID, STATUS, APPROVED_BY, APPROVED_AT, UPDATED_AT, MODULE_ID) 
                              VALUES (:id, 'PENDING', :createdBy, UNIX_TIMESTAMP(), UNIX_TIMESTAMP(), :moduleId)`;
const MODULE_INSERT_BASE_QUERY = `INSERT INTO ELECTION_MODULE VALUES `;
const ColumnnamesFromCandidate_configTabel = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'candidate_config'`;
const MODULE_COLUMN_ORDER = ['ID', 'NAME'];
const CANDIDATE_CONFIG_INSERT_BASE_QUERY = `INSERT INTO CANDIDATE_CONFIG_DATA (ID,CANDIDATE_CONFIG_ID,MODULE_ID) VALUES `
const CANDIDATE_CONFIG_COLUMN_ORDER = ['id', 'candidateConfigId','moduleId'];

const SUPPORT_DOC_INSERT_BASE_QUERY = `INSERT INTO SUPPORT_DOC_CONFIG_DATA (ID,SUPPORT_DOC_CONFIG_ID,MODULE_ID) VALUES `
const SUPPORT_DOC_COLUMN_ORDER = ['id', 'supportDocConfigId','moduleId'];

const DIVISION_INSERT_BASE_QUERY = `INSERT INTO DIVISION_CONFIG (ID,NAME,CODE,NO_OF_CANDIDATES,MODULE_ID) VALUES `
const DIVISION_COLUMN_ORDER = ['id', 'divisionName','divisionCode','noOfCandidates','moduleId'];

const ELECTION_MODULE_UPDATE_QUERY = `UPDATE ELECTION_MODULE 
                                SET 
                                NAME = :name,
                                DIVISION_COMMON_NAME = :divisionCommonName,
                                UPDATED_AT = :updatedAt,
                                CREATED_BY = :createdBy
                                WHERE 
                                ID = :id`;

const ELECTION_CONFIG_INSERT_BASE_QUERY = `INSERT INTO ELECTION_MODULE_CONFIG_DATA (ID,VALUE,ELECTION_MODULE_CONFIG_ID,MODULE_ID) VALUES `
const ELECTION_CONFIG_COLUMN_ORDER = ['id', 'value','electionModuleConfigId','moduleId'];

const ELIGIBILITY_CONFIG_INSERT_BASE_QUERY = `INSERT INTO ELIGIBILITY_CONFIG_DATA (ID,ELIGIBILITY_CONFIG_ID,MODULE_ID) VALUES `
const ELIGIBILITY_CONFIG_COLUMN_ORDER = ['id', 'eligibilityConfigId','moduleId'];


const CANDIDATE_CONFIG_DELETE_QUERY = `DELETE FROM CANDIDATE_CONFIG_DATA WHERE MODULE_ID = :moduleId`;
const SUPPORTING_DOC_DELETE_QUERY = `DELETE FROM SUPPORT_DOC_CONFIG_DATA WHERE MODULE_ID = :moduleId`;
const DIVISION_CONFIG_DELETE_QUERY = `DELETE FROM DIVISION_CONFIG WHERE MODULE_ID = :moduleId`;
const ELECTION_CONFIG_DELETE_QUERY = `DELETE FROM ELECTION_MODULE_CONFIG_DATA WHERE MODULE_ID = :moduleId`;
const ELIGIBILITY_CONFIG_DELETE_QUERY = `DELETE FROM ELIGIBILITY_CONFIG_DATA WHERE MODULE_ID = :moduleId`;
const ELECTION_MODULE_APPROVAL_DELETE_QUERY = `DELETE FROM ELECTION_MODULE_APPROVAL WHERE MODULE_ID = :moduleId`;
const ELECTION_MODULE_DELETE_QUERY = `DELETE FROM ELECTION_MODULE WHERE ID = :moduleId`;
const ALL_ELECTION_TEMPLATE_SELECT_QUERY = `SELECT
                                            EM.ID AS module_id,
                                            EM.NAME AS module_name,
                                            EMA.STATUS AS module_status,
                                            EM.CREATED_BY AS module_created_by,
                                            EMA.UPDATED_AT AS module_last_modified
                                            FROM
                                            ELECTION_MODULE EM LEFT JOIN ELECTION_MODULE_APPROVAL EMA
                                            ON EM.ID=EMA.MODULE_ID`;
const TEMPLATE_STATUS_UPDATE_QUERY = `UPDATE ELECTION_MODULE_APPROVAL 
                                            SET 
                                            STATUS = :status,
                                            UPDATED_AT = :updatedAt,
                                            REVIEW_NOTE = :reviewNote
                                            WHERE 
                                            MODULE_ID = :moduleId`;

const CANDIDATE_CONFIG_SELECT_QUERY = `SELECT CC.ID AS candidate_config_id,
                                        CC.KEY_NAME AS candidate_config_key_name,
                                        CC.DESCRIPTION AS candidate_config_description,
                                        CC.JSON_SCHEMA AS candidate_config_json_schema
                                        FROM CANDIDATE_CONFIG_DATA CAD LEFT JOIN CANDIDATE_CONFIG CC ON CAD.CANDIDATE_CONFIG_ID=CC.ID
                                        WHERE CAD.MODULE_ID=:id`;
                                
const fetchModuleById = (moduleId) => {
    const params = {id: moduleId};
    return DbConnection()
        .query(MODULE_SELECT_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.SELECT,
            }).catch((error) => {
            throw new DBError(error);
        });
};

const fetchCandidateFormConfigById = (moduleId) => {
  const params = {id: moduleId};
  return DbConnection()
      .query(CANDIDATE_CONFIG_SELECT_QUERY,
          {
              replacements: params,
              type: DbConnection().QueryTypes.SELECT,
          }).catch((error) => {
          throw new DBError(error);
      });
};


/**
 * Same can be used to insert single and multiple module too,
 * we should pass list of modules(module) to insert multiple modules
 * @param modules :Array of modules
 * @returns {Promise.<T>}
 */
const insertModules = (modules) => {
    return DbConnection()
        .query(formatQueryToBulkInsert(MODULE_INSERT_BASE_QUERY, modules),
            {
                replacements: formatDataToBulkInsert(modules, MODULE_COLUMN_ORDER),
                type: DbConnection().QueryTypes.INSERT,
            }).catch((error) => {
            throw new DBError(error);
        });
};

//get all election modules by status
const fetchModuleSByStatus = (status) => {
    const params = {status: status};
    return DbConnection()
        .query(ALL_MODULE_SELECT_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.SELECT,
            }).catch((error) => {
            throw new DBError(error);
        });
};
const fetchColumnnamesFromCandidateConfigTabel = () => {
    console.log("c");
    return DbConnection()
        .query(ColumnnamesFromCandidate_configTabel,
            {
                type: DbConnection().QueryTypes.SELECT,
            }).catch((error) => {
            throw new DBError(error);
        });
};
/*const InsertTodivisionConfig = (req) => {
    const params = {ID: req., NAME: name, CODE:,NO_OF_CANDIDATES:,MODULE_ID:};
    return DbConnection()
        .query(DIVISIONCONFIG_INSERT_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.INSERT,
            }).catch((error) => {
            throw new DBError(error);
        });
};*/
//InsertTodivisionConfig
//
const DIVISION_CONFIG_INSERT_BASE_QUERY = `INSERT INTO division_config VALUES `;
const DIVISION_CONFIG_COLUMN_ORDER = ['ID', 'NAME', 'CODE', 'NO_OF_CANDIDATES', 'MODULE_ID'];
const InsertTodivisionConfig = (list) => {

    return DbConnection()
        .query(formatQueryToBulkInsert(DIVISION_CONFIG_INSERT_BASE_QUERY, list),
            {
                replacements: formatDataToBulkInsert(list, DIVISION_CONFIG_COLUMN_ORDER),
                type: DbConnection().QueryTypes.INSERT,
            }).catch((error) => {
            throw new DBError(error);
        });
};

const saveCandidateConf = async (moduleId, data, transaction) => {
    const params = {moduleId:moduleId};
    // Transforming the object to match update query { }
    data = data.map((record) => {
      record.moduleId = moduleId;
      record.id = uuidv4();
      return record;
    });
 await  DbConnection()
  .query(CANDIDATE_CONFIG_DELETE_QUERY,
    {
      replacements: params,
      type: DbConnection().QueryTypes.DELETE,
      transaction
    }).catch((error) => {
      throw new DBError(error);
    });
  if( data instanceof Array && data.length > 0){
  return DbConnection()
  .query(formatQueryToBulkInsert(CANDIDATE_CONFIG_INSERT_BASE_QUERY, data),
    {
      replacements: formatDataToBulkInsert(data, CANDIDATE_CONFIG_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
      transaction,
    }).catch((error) => {
       throw new DBError(error);
     });
    }
};

/**
 * save active election transaction 
 * save module candidate supporting docs
 * @returns {Promise.<T>}
 */
const saveSupportDocs = async (moduleId,data, transaction) => {
  const params = {moduleId:moduleId};
  data = data.map((record) => {
    record.moduleId = moduleId;
    record.id = uuidv4();
    return record;
});
  await  DbConnection()
  .query(SUPPORTING_DOC_DELETE_QUERY,
    {
      replacements: params,
      type: DbConnection().QueryTypes.DELETE,
      transaction
    }).catch((error) => {
      throw new DBError(error);
    });
  if( data instanceof Array && data.length > 0){
  return DbConnection()
  .query(formatQueryToBulkInsert(SUPPORT_DOC_INSERT_BASE_QUERY, data),
    {
      replacements: formatDataToBulkInsert(data, SUPPORT_DOC_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
      transaction,
    }).catch((error) => {
       throw new DBError(error);
     });
    }
};
/**
 * save active election transaction 
 * save module division config
 * @returns {Promise.<T>}
 */
const saveDivisionConf = async (moduleId,data, transaction) => {
  const params = {moduleId:moduleId};
  data = data.map((record) => {
    record.moduleId = moduleId;
    record.id = uuidv4();
    return record;
});
  await  DbConnection()
  .query(DIVISION_CONFIG_DELETE_QUERY,
    {
      replacements: params,
      type: DbConnection().QueryTypes.DELETE,
      transaction
    }).catch((error) => {
      console.log(error);
      throw new DBError(error);
    });
  if( data instanceof Array && data.length > 0){
  return DbConnection()
  .query(formatQueryToBulkInsert(DIVISION_INSERT_BASE_QUERY, data),
    {
      replacements: formatDataToBulkInsert(data, DIVISION_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
      transaction,
    }).catch((error) => {
       throw new DBError(error);
     });
    }
};

/**
 * save active election transaction 
 * save module election config
 * @returns {Promise.<T>}
 */
const saveElectionConfig = async (moduleId,data, transaction) => {
  const params = {moduleId:moduleId};
  data = data.map((record) => {
    record.moduleId = moduleId;
    record.id = uuidv4();
    return record;
});
  await  DbConnection()
  .query(ELECTION_CONFIG_DELETE_QUERY,
    {
      replacements: params,
      type: DbConnection().QueryTypes.DELETE,
      transaction
    }).catch((error) => {
      throw new DBError(error);
    });
  if( data instanceof Array && data.length > 0){
  return DbConnection()
  .query(formatQueryToBulkInsert(ELECTION_CONFIG_INSERT_BASE_QUERY, data),
    {
      replacements: formatDataToBulkInsert(data, ELECTION_CONFIG_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
      transaction,
    }).catch((error) => {
       throw new DBError(error);
     });
    }
};
/**
 * save active election transaction 
 * save module eligibility config
 * @returns {Promise.<T>}
 */
const saveEligibilityConfig = async (moduleId,data, transaction) => {
  const params = {moduleId:moduleId};
  data = data.map((record) => {
    record.moduleId = moduleId;
    record.id = uuidv4();
    return record;
});
  await  DbConnection()
  .query(ELIGIBILITY_CONFIG_DELETE_QUERY,
    {
      replacements: params,
      type: DbConnection().QueryTypes.DELETE,
      transaction
    }).catch((error) => {
      throw new DBError(error);
    });
  if( data instanceof Array && data.length > 0){
  return DbConnection()
  .query(formatQueryToBulkInsert(ELIGIBILITY_CONFIG_INSERT_BASE_QUERY, data),
    {
      replacements: formatDataToBulkInsert(data, ELIGIBILITY_CONFIG_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
      transaction,
    }).catch((error) => {
      console.log(error);
       throw new DBError(error);
     });
    }
};

/**
 * save active election transaction 
 * update module division common name
 * @returns {Promise.<T>}
 */
const updateElectionModule = (params,transaction) => {
console.log("params",params);
	return DbConnection()
		.query(ELECTION_MODULE_UPDATE_QUERY,
			{
				replacements: params,
        type: DbConnection().QueryTypes.UPDATE,
        transaction,
			}).catch((error) => {
        console.log(error);
				throw new DBError(error);
			});
};

/**
 *
 * save active election transaction 
 * insert election module 
 */
const insertElectionModule = (params,transaction) => {
  return DbConnection()
    .query(MODULE_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
        transaction,
      }).catch((error) => {
      throw new DBError(error);
    });
};

const approveElectionModule = (params,transaction) => {
  return DbConnection()
    .query(MODULE_APPROVE_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
        transaction,
      }).catch((error) => {
      throw new DBError(error);
    });
};


const Election_Module_UPDATE_QUERY = `UPDATE election_module SET DIVISION_COMMON_NAME = :name WHERE ID = :id`;
const UpdateElectionModule = (name, id) => {
    const params = { name: name, id: id };
    console.log(params);
    return DbConnection()
        .query(Election_Module_UPDATE_QUERY,
            {
                replacements: params,
                type: DbConnection().QueryTypes.UPDATE,
            }).catch((error) => {
            throw new DBError(error);
        });
};

//----- Start of Election module delete ---------
const deleteCandidateConf = async (moduleId, transaction) => {
  const params = {moduleId:moduleId};
await  DbConnection()
.query(CANDIDATE_CONFIG_DELETE_QUERY,
  {
    replacements: params,
    type: DbConnection().QueryTypes.DELETE,
    transaction
  }).catch((error) => {
    throw new DBError(error);
  });
};
const deleteSupportDocConf = async (moduleId, transaction) => {
  const params = {moduleId:moduleId};
await  DbConnection()
.query(SUPPORTING_DOC_DELETE_QUERY,
  {
    replacements: params,
    type: DbConnection().QueryTypes.DELETE,
    transaction
  }).catch((error) => {
    throw new DBError(error);
  });
};
const deleteDivisionConf = async (moduleId, transaction) => {
  const params = {moduleId:moduleId};
await  DbConnection()
.query(DIVISION_CONFIG_DELETE_QUERY,
  {
    replacements: params,
    type: DbConnection().QueryTypes.DELETE,
    transaction
  }).catch((error) => {
    throw new DBError(error);
  });
};
const deleteElectionConf = async (moduleId, transaction) => {
  const params = {moduleId:moduleId};
await  DbConnection()
.query(ELECTION_CONFIG_DELETE_QUERY,
  {
    replacements: params,
    type: DbConnection().QueryTypes.DELETE,
    transaction
  }).catch((error) => {
    throw new DBError(error);
  });
};
const deleteEligibilityConf = async (moduleId, transaction) => {
  const params = {moduleId:moduleId};
await  DbConnection()
.query(ELIGIBILITY_CONFIG_DELETE_QUERY,
  {
    replacements: params,
    type: DbConnection().QueryTypes.DELETE,
    transaction
  }).catch((error) => {
    throw new DBError(error);
  });
};
const deleteElectionModuleApproval = async (moduleId, transaction) => {
  const params = {moduleId:moduleId};
await  DbConnection()
.query(ELECTION_MODULE_APPROVAL_DELETE_QUERY,
  {
    replacements: params,
    type: DbConnection().QueryTypes.DELETE,
    transaction
  }).catch((error) => {
    throw new DBError(error);
  });
};
const deleteElectionModule = async (moduleId, transaction) => {
  const params = {moduleId:moduleId};
await  DbConnection()
.query(ELECTION_MODULE_DELETE_QUERY,
  {
    replacements: params,
    type: DbConnection().QueryTypes.DELETE,
    transaction
  }).catch((error) => {
    console.log(error);
    throw new DBError(error);
  });
};
//----- End of Election module delete ---------

const fetchAllElectionTemplates = () => {
	return DbConnection()
		.query(ALL_ELECTION_TEMPLATE_SELECT_QUERY, {
			type: DbConnection().QueryTypes.SELECT,
		}).catch( (error) => {
			throw new DBError(error);
		});
}

const updateTemplateStatus = (params) => {
  console.log("params",params);
	return DbConnection()
		.query(TEMPLATE_STATUS_UPDATE_QUERY,
			{
				replacements: params,
        type: DbConnection().QueryTypes.UPDATE,
      }).then((responce) => {
        return params;
      })
      .catch((error) => {
				throw new DBError(error);
			});
};

export default {
  fetchModuleById,
  insertModules,
  fetchModuleSByStatus,
  saveCandidateConf,
  saveSupportDocs,
  saveDivisionConf,
  saveElectionConfig,
  updateElectionModule,
  insertElectionModule,
  approveElectionModule,
  saveEligibilityConfig,
  deleteCandidateConf,
  deleteSupportDocConf,
  deleteDivisionConf,
  deleteElectionConf,
  deleteEligibilityConf,
  deleteElectionModuleApproval,
  deleteElectionModule,
  fetchAllElectionTemplates,
  updateTemplateStatus,
  fetchCandidateFormConfigById
}