/**
 * Created by ananda on 3/5/19.
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

