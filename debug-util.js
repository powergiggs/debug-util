
const chalk = require('chalk');
const caller = require('./caller');
const date = new Date();
const proc = process.argv;

// grab parameter passed when script was ran
function grab(param) {
  const i = proc.indexOf(param);
  return (i === -1 ? null : process.argv[i + 1]);
}
const DEBUG = grab('--debug') || grab('-d');
// set debug env var to true if true is passed
if (DEBUG === 'true'){
  process.env.DEBUG = 'true'
}

function debug(msg, type, data, callback) {
  // get info about who made the call
  const who = caller();


  if (!msg) {
    console.log('You must specify a message THE LEAST. DEBUG module crashed!');
    if(callback) return callback(0);
  }
  // make sure no unknown or string type was sent
  if (type > 2 || typeof type === 'string') {
    console.log(`type of ${type} is invalid. DEBUG module crashed! valid: int[0,1,2]`);
    if(callback) return callback(0);
  }
  // make sure debug mode is set to true
  if (process.env.DEBUG === 'true') {
    // stringify objects is obj was passed
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    // set the type of msg based on tye passed
    let t = 'Mesg';
    if (type === 0) {
      t = '!Err';
    } else if (type === 1) {
      t = 'Warn';
    } else if (type === 2) {
      t = 'Info';
    }
    // set an objt of detailed msg
    const logMsg = {
      type: t,
      mesg: msg,
      path: who.filePath,
      line: who.lineNumber,
      func: who.functionName,
      ftyp: who.typeName,
      meth: who.methodName,
      data: data
    };
    // set a time
    const time = `Time: ${date.getHours()}:${date.getMinutes()} ${date.getSeconds()}`;
    // customize msg
    colorAndConsole(logMsg, time, callback);
  }else{
    if(callback) return callback(0);
  }
}
// });
// }

// this will customize the log message
function colorAndConsole(msg, time, callback) {
  // set colors
  const mode = '\n-- Debugging -----------------';
  const blueb = chalk.bold.blue;
  const blue = chalk.blue;
  const green = chalk.green;
  const magenta = chalk.magenta;
  const cyanb = chalk.bold.cyan;
  const cyan = chalk.cyan;
  const redb = chalk.bold.red;
  const red = chalk.red;
  const yellowb = chalk.bold.yellow;
  const yellow = chalk.yellow;
  // console log msg nicelly
  console.log(
    `${mode}
  ${green(time)}
  ${redb(msg.type)}: ${red(msg.mesg)}
  ${cyanb('Line')}: ${cyan(msg.line)}
  ${yellowb('File')}: ${yellow(msg.path)}
  Func: ${magenta(msg.func)} | type: ${magenta(msg.ftyp)} | method: ${magenta(msg.meth)}
  ${blueb('Data')}: ${typeof msg.data} ${blue(msg.data)}\n`);
}
// this will disable any console.log on the page
if (!process.env.DEBUG) {
  console.log = () => {};
}

module.exports.debug = debug;
module.exports.colorAndConsole = colorAndConsole;
module.exports.grab = grab;
module.exports.process = proc;
