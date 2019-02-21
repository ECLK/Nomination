
import 'dotenv/config';
import {formatQueryToBulkInsert, formatDataToBulkInsert} from '../sqlHelper';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let sinon = require('sinon');
let should = chai.should();
let assert = chai.assert;



chai.use(chaiHttp);

describe('sqlHelper test', () => {

  it('test formatQueryToBulkInsert', () => {
    const baseQuery = 'INSERT INTO USER VALUES ';
    const records = [{'ID': '3425', 'NAME': 'Ananda'}, {'ID': '3422', 'NAME': 'Ananda1'}];
    const result  = formatQueryToBulkInsert(baseQuery, records);
    assert.equal(result, 'INSERT INTO USER VALUES (?),(?)');

  });

  it('test formatDataToBulkInsert', () => {

    const records = [{'ID': '3425', 'NAME': 'Ananda'}, {'ID': '3422', 'NAME': 'Ananda1'}];
    const order = [":ID", ":NAME"];
    const result = formatDataToBulkInsert(records, order);
    assert.deepEqual(result, [ [ '3425', 'Ananda' ], [ '3422', 'Ananda1' ] ]);
  });
});