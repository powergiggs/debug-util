const chalk = require('chalk');
const fs = require('fs');
const callerId = require('caller-id');

const date = new Date();

function grab(param) {
  const i = process.argv.indexOf(param);
  return (i === -1 ? null : process.argv[i + 1]);
}
let DEBUG = grab('--debug') || grab('-d');
if (DEBUG === 'true'){
  DEBUG = true;
}

function debug(msg, type, data) {
  const who = callerId.getData();
  fs.access('./logs', (err) => {
    if(err){
      console.log(err);
    }else{
      if(DEBUG === true){

        if(type > 2 || typeof type == "string") {
          console.log(`type of ${type} is invalid. DEBUG module crashed! valid: int[0,1,2]`);
          return;
        }

        if(typeof data === 'object'){
          data = JSON.stringify(data);
        }

        let t = 'Mesg';
        if (type === 0) {
          t = '!Err';
        } else if (type === 1) {
          t = 'Warn';
        } else if (type === 2) {
          t = 'Info';
        }

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

        const time = `Time: ${date.getHours()}:${date.getMinutes()} ${date.getSeconds()}`;

        colorAndConsole(logMsg, time);
        logTofile(logMsg, time);
      }
    }
  });
}

function colorAndConsole(msg, time) {

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

  console.log(
  `${mode}
  ${green(time)}
  ${redb(msg.type)}: ${red(msg.mesg)}
  ${cyanb('Line')}: ${cyan(msg.line)}
  ${yellowb('File')}: ${yellow(msg.path)}
  Func: ${magenta(msg.func)} | type: ${magenta(msg.ftyp)} | method: ${magenta(msg.meth)}
  ${blueb('Data')}: ${typeof msg.data} ${blue(msg.data)}\n`);
}

function logTofile(msg, time) {
  const logMsg =
`${time}
${msg.type}: ${msg.mesg}
'Line': ${msg.line}
'File': ${msg.path}
Func: ${msg.func} | type: ${msg.ftyp} | method: ${msg.meth}
'Data': ${typeof msg.data} ${msg.data}\n`;
  const file = `log_${date.getMonth() + 1}_${date.getDate()}_${date.getFullYear()}_${date.getHours()}.log`;
  const title = `================ Log of ${date.getMonth() + 1} ${date.getDate()} ${date.getFullYear()} Hour: ${date.getHours()} =====`;

  if (!fs.existsSync(`./logs/${file}`)) {
    fs.writeFileSync(`logs/${file}`, title);
  }

  fs.appendFileSync(`./logs/${file}`, `\n\n${logMsg.trim()}`);
}

module.exports = debug;
