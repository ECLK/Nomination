import { User }  from 'Models';
var joinjs = require('join-js').default;
import _ from 'lodash';
import { List } from 'typed-immutable';

// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'userMap',
    idProperty: 'id',
    properties: ['id', 'name','email','party']
  },
  {
    mapId: 'usersMap',
    idProperty: 'id',
    properties: ['id', 'name','email','party']
  }
];


const mapToUserModel = (users) => {
  console.log("mappedUseusersrs",users);

  const mappedUsers = joinjs.map(users, resultMaps, 'userMap', 'user_');
console.log("mappedUsers",mappedUsers);
  //just an example how to convert row data object to Model
  return User({
    id: mappedUsers[0].id,
    name: mappedUsers[0].name,
    email: mappedUsers[0].email,
    party: mappedUsers[0].party,
  });
};


const mapToAllUserModel = (users) => {
	const mappedUsers = joinjs.map(users, resultMaps, 'usersMap', 'user_');
	if (!_.isEmpty(mappedUsers)) {
		return _.reduce(mappedUsers, (result, users) => {
			return result.push({
				id: users.id,
        name: users.name,
        email: users.email,
        party: users.party,
        action:'action'
			});
		}, List(User)());
	}
}
export default {
  mapToUserModel,
  mapToAllUserModel
};
