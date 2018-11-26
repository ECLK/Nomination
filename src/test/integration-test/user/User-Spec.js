import 'dotenv/config';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../middleware/express');
let sinon = require('sinon');
let should = chai.should();
let assert = chai.assert;


chai.use(chaiHttp);

describe('User', () => {
  /**
   * To be done
   */
});
