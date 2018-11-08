import 'dotenv/config';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../middleware/express');
let sinon = require('sinon');
let should = chai.should();
let assert = chai.assert;


chai.use(chaiHttp);

describe('EmployeeShit', () => {

    let clock, slow;

    before( () => {
        clock = sinon.useFakeTimers();

        // Sample function, this would normally be where you `require` your modules
        slow = (cb) => {
            setTimeout(() => {
                cb(null, 1)
            }, 500);
        };
    });

    after( () => {
        clock.restore();
    });

    it('it should test the api', (done) => {
        chai.request(server)
            .get('/api/test')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


    it('should work with spies and fake time', () => {
        let callback = sinon.spy();

        slow(callback);
        clock.tick(550); // advance time 550 milliseconds

        assert.isTrue(callback.called);
        assert.equal(callback.callCount, 1);
        assert.isTrue(callback.calledWith(null, 1));
    });

    it('should stub', () => {
        let stub = sinon.stub().returns(25);

        assert.equal(stub(), 25);
        assert.isTrue(stub.calledOnce);
    });
});