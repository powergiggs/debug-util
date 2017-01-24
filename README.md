# Debug Utility Tool

This is a very easy to use tool that intends to help making
logging and console.logging rich. This tool will allow you
to have detailed message of what is going on with your project
while debugging.

As developers we are constantly console.logging here and there
to check what is returned, what is contained in a variable or
to simply add tracks to know how the code is executing.

This tool allow you to set a message and everything else is done
for you. The tool will give you the line and file the error happened
at, who called, what method was used and if any data was returned and
display it nicely.

The tool also comes with sub-functionality that will allow you to
just console log it nicely.


![console](https://raw.githubusercontent.com/ECorreia45/imgs/master/console.png)

## Installation

download this repo to your local environment and through terminal
navigate to the download folder destination and run this following
command to install it:

``npm install``



### Usage


###Debug

You can simply require it to a variable and start using it.

![require](https://raw.githubusercontent.com/ECorreia45/imgs/master/req.png)

### Turn Debug Mode ON

This module blocks any console log among your code so to use this module
you must first turn DEBUG mode ON:

Lets say you want to run server.js on debug mode

``node server.js --debug true``

or

``node server.js -d true``

Both ways you can set DEBUG on

### .debug

The .debug funtion allows for 3 optional parameters and 1 required.

__You must provide a message to it__

`` util.debug('This message is required');``

__Specify a Message Type__

`` util.debug('This message is required', 1);``

You can pass it a ``0``, ``1``, or ``2`` and it cannot be a string;

* 0 = Error;
* 1 = Warn;
* 2 = Info;

sample debug info:
```
-- Debugging -----------------
  Time: 17:19 32
  !Err: testing util
  Line: 580
  File: module.js
  Func: Module._extensions..js | type: Object | method: .js
  Data: undefined undefined

```

By default and message is set to be a ``Mesg``

![defaultMsg](https://raw.githubusercontent.com/ECorreia45/imgs/master/defmesg.png)

__Pass some DATA__


if you simply want to check what data is returned or being processed
you can simply pass it as the 3 argument. This means that at this point
you must specify a message type.

for example:

```javascript

let n = 4;

function foo(number){
    util.debug('what is the number?', 2, number)
}

foo(n);

```

__Callback function__

```javascript
util.debug('what is the number?', 2, number, function (err) {
    if(err == 0){
      // do something
    }else{
      // do another
    }
  })
```

This callback function is used to see if the tool did its job or failed.
You will double check if the tool threw an error and you didn't happen to catch it.


### Version Bump
Version bump accept 2 arguments, the Version
and a type argument to increment the Version,
then return a version number as a string.

Using Version Bump:
```
const util = require('./debug-util');
const patch = util.verBump('3.3.3', 'patch');
const minor = util.verBump('3.3.3', 'minor');
const major = util.verBump('3.3.3', 'major');
```
