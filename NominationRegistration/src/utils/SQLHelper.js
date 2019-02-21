const updateQueryWithLimit = (query, limit) => {
  if(limit) {
    return query +" LIMIT :limit";
  } else {
    return query;
  }
};

const updateQueryWithOffset = (query, offset) => {
  if(offset) {
    return query +" OFFSET :offset";
  } else {
    return query;
  }
};

const updateQueryWithLimitAndOffset = (query, limit, offset) => {
  return updateQueryWithOffset(updateQueryWithLimit(query, limit), offset);
};

export default {
  updateQueryWithLimit,
  updateQueryWithOffset,
  updateQueryWithLimitAndOffset,
}