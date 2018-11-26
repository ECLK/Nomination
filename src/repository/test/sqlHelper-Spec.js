
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
    const baseQuery = 'INSERT INTO nomination VALUES ';
    const records = [{'nomination_id': '3425', 'team_id': 'unp', 'election_id': 'ele2018', 'division_id': 'gampaha', 'status': 'created'}, {'nomination_id': '3425', 'team_id': 'upfa', 'election_id': 'ele2018', 'division_id': 'colombo', 'status': 'created'}];
    const result  = formatQueryToBulkInsert(baseQuery, records);
    assert.equal(result, 'INSERT INTO nomination VALUES (?),(?)');
  });


  it('test formatDataToBulkInsert', () => { 
    const records = [{'nomination_id': '3425', 'team_id': 'unp', 'election_id': 'ele2018', 'division_id': 'gampaha', 'status': 'created'}, {'nomination_id': '3425', 'team_id': 'upfa', 'election_id': 'ele2018', 'division_id': 'colombo', 'status': 'created'}];
    const order = [":nomination_id", ":team_id", ":election_id", ":division_id", ":status"];
    const result = formatDataToBulkInsert(records, order);
    assert.deepEqual(result, [ [ '3425', 'unp', 'ele2018', 'gampaha', 'created' ], [ '3422', 'upfa', 'ele2018', 'colombo', 'created' ] ]);
  });
});