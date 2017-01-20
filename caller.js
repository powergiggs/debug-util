var stackTrace = require('stack-trace');

function getCaller(func) {
  return func.caller;
}

function getData() {
  var trace = stackTrace.get(getCaller(getData));
  var caller = trace[2];
  return {
    typeName: caller.getTypeName(),
    functionName: caller.getFunctionName(),
    methodName: caller.getMethodName(),
    filePath: caller.getFileName(),
    lineNumber: caller.getLineNumber(),
    topLevelFlag: caller.isToplevel(),
    nativeFlag: caller.isNative(),
    evalFlag: caller.isEval(),
    evalOrigin: caller.getEvalOrigin()
  };
}

module.exports = getData;