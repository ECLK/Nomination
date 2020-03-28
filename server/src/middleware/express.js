import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { bindMiddlewares } from './WSMiddleware';
import configService from '../config/ConfigService';
// import {PDF_GENARATION_SERVICE_URL} from '../config/config';
import { createProxyMiddleware } from 'http-proxy-middleware';
var jwtDecode = require('jwt-decode');

let log4js = require('log4js');
let logger = log4js.getLogger("app");

const app = express();

app.use(cookieParser());

// move this to a config file
const PDF_GENARATION_SERVICE_URL = process.env.NOMINATION_PDF_GENARATION_SERVICE_URL;

let generateProxy = createProxyMiddleware('/ec-election/generate', {
  target: PDF_GENARATION_SERVICE_URL+'/generate',
  pathRewrite: function (path, req) {
    return path.replace('/ec-election/generate', '')
  }
});
app.use(generateProxy);

let exportsProxy = createProxyMiddleware('/ec-election/exports', {
  target: PDF_GENARATION_SERVICE_URL+'/exports',
  pathRewrite: function (path, req) {
    return path.replace('/ec-election/exports', '')
  }
});
app.use(exportsProxy);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

// Decode JWT Token (commented this for production buid until connect api manager )
app.use((req, res, next)=>{
    let JWT = req.headers['x-jwt-assertion'];
    var decoded = jwtDecode(JWT);
    req.jwt = decoded;
    next();
})


// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// disable 'X-Powered-By' header in response
app.disable('x-powered-by');

// Remove No Cache Control
app.disable('etag');

// Bind middleware
bindMiddlewares(app);

// Error handler
app.use((error, req, res, next) => {
  if (res.headersSent)
    logger.error("Something went wrong:", error);
  return res.status(500).send(error.message);
});

const server = app.listen(configService.getConfig('SERVER_PORT'), () => {
    logger.info('Express server listening on port ', server.address().port, " with pid ", process.pid );
});

module.exports = server; // for testing

