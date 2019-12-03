var API_BASE_URL = 'http://localhost:8280/nominations/0.9';
var PDF_GENARATION_SERVICE_URL = 'http://localhost:5000/';
var AUTH_BASE_URL = 'http://localhost:3001/';


if (process.env.NODE_ENV === 'production'){
    API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    PDF_GENARATION_SERVICE_URL = process.env.REACT_APP_PDF_GENARATION_SERVICE_URL;
    AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL;
}

module.exports = {
    API_BASE_URL,
    PDF_GENARATION_SERVICE_URL,
    AUTH_BASE_URL
}
