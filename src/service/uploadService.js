const multer = require('multer');
const upload = multer({dest: 'uploads/'});
let single = upload.single('file');

const uploadFile = async (req, res) => {
  var promise1 = new Promise(function (resolve, reject) {
    single(req, res, function (r) {
      const {filename, mimetype, originalname} = req.file;
      resolve({filename, mimetype, originalname});
    });

  });
  return await promise1;
};

export default {
  uploadFile
}
