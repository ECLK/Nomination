const multer = require('multer');
const upload = multer({dest: 'src/uploads/'});
let single = upload.single('file');
import { HTTP_CODE_404, HTTP_CODE_204 } from '../routes/constants/HttpCodes';
import { ServerError, ApiError } from 'Errors';


var fs     = require('fs');
var path   = require('path');
const DL_SESSION_FOLDER = '/src/download_sessions';

const uploadFile = async (req, res) => {
  var promise1 = new Promise(function (resolve, reject) {
    single(req, res, function (r) {
      const {filename, mimetype, originalname} = req.file;
      resolve({filename, mimetype, originalname});
    });

  });
  return await promise1;
};

/* Gets the download file path related to a download sid */
const getDownloadFilePath = async (downloadSid) => {
  try{
  // Get the download session file name
  var dlSessionFileName = path.join('./src/uploads/'+downloadSid);
  console.log("dlSessionFileName",dlSessionFileName);

  // Check if the download session exists
  const existsSync = await fs.existsSync(dlSessionFileName);
  console.log("existsSync",existsSync);
  if (!existsSync) {
    throw new ApiError("Download does not exist", HTTP_CODE_404);
  }

  // Get the file path
  // const readFile = await fs.readFile(dlSessionFileName);
  fs.readFile(dlSessionFileName, function(err, data) {

    // Return the file path
    console.log("readFile",data);
return {data:data};
    // callback(null, data);
  });

  // return readFile;
}catch (err){
  console.log(err);
}
}

/* Gets the download file path related to a download sid */
const getDownloadImage = async (downloadSid,res,next) => {
  try{
  // Get the download session file name
  var dlSessionFileName = path.join('./src/uploads/'+downloadSid);
  console.log("dlSessionFileName",dlSessionFileName);

  // Check if the download session exists
  const existsSync = await fs.existsSync(dlSessionFileName);
  console.log("existsSync",existsSync);
  if (!existsSync) {
    throw new ApiError("image does not exist", HTTP_CODE_404);
  }
  else{
    console.log("ddddd",path.join(__dirname, '../uploads/', downloadSid));
    return res.sendFile(path.join(__dirname, '../uploads/', downloadSid), {}, function (err) {
      if (err) {
         next(err);
      } else {
        console.log('Sent:', fileName)
      }
    });
  }

  var options = {
    root: path.join(__dirname, './src/uploads/'),
    dotfiles: 'deny',
    // headers: {
    //   'x-timestamp': Date.now(),
    //   'x-sent': true
    // }
  }

  var fileName = downloadSid;
  res.sendFile(fileName, options, function (err) {
    if (err) {
       next(err);
    } else {
      console.log('Sent:', fileName)
    }
  })

}catch (err){
  console.log("sgfsdfsdfdfdfd",err);
}
}

export default {
  uploadFile,
  getDownloadFilePath,
  getDownloadImage
}
