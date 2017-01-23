// test requirements
const chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
const rewire = require('rewire');
const sinon = require('sinon');
const util = rewire('../debug-util');
const caller = rewire('../caller');

const date = new Date();

describe('Debug Utility', () => {

  let msg, time, type, data, ret;

  before((done)=>{

    this.console = {
      log: sinon.spy()};

    util.__set__('console', this.console);

    msg = {
      type: 'Warn',
      mesg: 'utility tool',
      path: '/Users/usrname/www/_tests/debugTool/test.js',
      line: 4,
      func: null,
      ftyp: 'Object',
      meth: null,
      data: 'null' };

    time = `Time: ${date.getHours()}:${date.getMinutes()} i${date.getSeconds()}`;

    type = 1;

    data = ['unit','testing'];

    ret = 'temp';

    done()

  });

  it('Grab function should return null', function () {
    const debug = util.grab('--debug');
    expect(debug).to.equal(null)
  });

  it('logTofile function should return 1', function (done) {

    const debug = util.logTofile(msg, time, (res) => {
      return res
    } );

    expect(debug).to.equal(1);

    done()

  });

  it('colorAndConsole function should return 1 if debug mode is on', function (done) {

    const debug = util.colorAndConsole(msg, time, (res) => {
      return res
    } );

    expect(debug).to.equal(undefined);

    done()

  });

  it('debug function should return 0 if debug mode is off', function (done) {
    process.env.DEBUG = 'false';
    util.process = ['--debug','false'];
    util.debug('testing', type, data, (res) => {
      res.should.equal(0);
      done();
    } );
  });

  it('debug function should return 1', function (done) {
    process.env.DEBUG = 'true';
    util.process = ['--debug','true'];
    util.debug('testing', type, data, (res) => {
      res.should.equal(1);
      done();
    } );
  });

  it('debug function should return 0 if message is not defined', function (done) {
    process.env.DEBUG = 'true';
    util.process = ['--debug','true'];
    util.debug('', type, data, (res) => {
      res.should.equal(0);
      done();
    } );
  });

  it('debug function should return 0 if type is over 2', function (done) {
    process.env.DEBUG = 'true';
    util.process = ['--debug','true'];
    util.debug('msg', 3 , data, (res) => {
      res.should.equal(0);
      done();
    } );
  });

  it("Caller Function shoult return an object", (done) => {
    let obj = caller();
    expect(obj).to.be.a("object")

    done()
  })
});

