import {getNamespace} from 'continuation-local-storage';
import Sequelize from 'sequelize';
import configService from '../config/ConfigService';

const session = getNamespace('api-session');
Sequelize.cls = session;

const singleton = Symbol('singleton');
const singletonEnforcer = Symbol('singletonEnforcer');

class DataSourceFactory {
  /**
   * @param enforcer
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this.dbConnection = new Sequelize(configService.getConfig('DB_NAME'),
                                      configService.getConfig('DB_USER'),
                                      configService.getConfig('DB_PASSWORD'),
                                      { host: configService.getConfig('DB_HOST'),
                                        port: configService.getConfig('DB_PORT')});
  }

  /**
   * @returns DataSourceFactory
   */
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new DataSourceFactory(singletonEnforcer);
    }
    return this[singleton];
  }

}

const DbConnection = () => {
  return DataSourceFactory.instance.dbConnection;
};

export {
  DbConnection,
};
