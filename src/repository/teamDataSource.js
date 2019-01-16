import { getNamespace } from 'continuation-local-storage';
import Sequelize from 'sequelize';

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
    this.dbConnection = new Sequelize('EC_TEAM', 'root', 'Admin@#321');
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
