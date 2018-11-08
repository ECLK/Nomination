import { User }  from 'Models';


const mapToUserModel = (user) => {
  return User({
    id: user.ID,
    name: user.NAME,
  });
};

export default {
  mapToUserModel
};
