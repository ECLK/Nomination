/**
 * Created by achinih on 3/21/17.
 */
import { DbConnection } from './dataSource';

const beginTransaction = () => {
  return DbConnection().transaction();
};

const executeTransaction = (callBack) => {
  return DbConnection().transaction(t => callBack(t));
};

export {
  beginTransaction,
  executeTransaction,
};

