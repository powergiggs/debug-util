const debug = require('./debug');
const process = require('process');

// debug('error', 'testing', [this,__filename], 'ok', null);

function test() {
  debug('just testing this', 1, 4);
}

test();