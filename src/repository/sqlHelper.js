import _ from 'lodash';

const formatQueryToBulkInsert = (baseQuery, records) => {
  const numOfParams = _.reduce(records, (result) => {
    return result.concat(['(?)']);
  }, []);
  return baseQuery + numOfParams.join(',');
};

const formatDataToBulkInsert = (records, insertOder) => {
  return _.map(records, (record) => {
    return _.flattenDeep(_.reduce(insertOder, (result, key) => {
      const formattedKey = _.replace(key, ':', '');
      return _.concat(result, record[formattedKey]);
    }, []));
  });
};


export {
  formatQueryToBulkInsert,
  formatDataToBulkInsert
}