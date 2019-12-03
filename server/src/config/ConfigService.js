import minimist from 'minimist';
import { getLogger } from 'log4js';


const logger = getLogger('app');

let appConfigs;

/**
 * Initialize the Configuration from the Config server and inject to the app
 */
export const injectAppConfigs = ( tryCount= 0) => {
  logger.info(`Loading Configs from config-api. Try Count : ${tryCount}`);
  const argc = minimist(process.argv.slice(2));

  const CONFIG_PATH = argc['conf-path'];
  appConfigs = require(CONFIG_PATH);
  return appConfigs;
};


const getConfig = (configKey: string) => {
  return appConfigs[configKey]
};

export default {
  injectAppConfigs,
  getConfig,
};