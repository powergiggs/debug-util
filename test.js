const util = require('./debug-util');

let n = 4;

function foo(number){
  var test = util.debug('what is the number?', 2, number, function (err) {
    return err;
  })
}

foo(n);

