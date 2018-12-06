# Loggerhead-module
A simple npm module to send frontend log messages to a server.

## How it works
`Loggerhead-module.js` sends a log message to a configurable endpoint URL by a POST request each time one of the `log level` function is called.

### Log levels
Log levels are
* `info`
* `debug`
* `warning`
* `error`

By default all levels are enabled. Whenever a log level function is called, it receives a string message, it prepares a `POST` request and it forwards the message to the set `URL`, injecting in the `POST` data the `log level` information. At the same time, all the same correspondant levels are available and enabled for the `console` to be shown. The enable/disable can be toggled by config parameters.

**Note**: each log level function returns the `Promise` that sends the `POST` request, this way it is possible to add a `.then()` slice in order to apply some other action on the `response` (if any) from the server after storing the log message. See an example below:
```javascript
Loggerhead.info('Send this info log message to the server')
    .then(serverResponse => alert(serverResponse.message))
    .catch(error => alert(serverResponse.error));
```

### Headers
`Loggerhead-module.js` provides also a way to customize `headers` values of the `POST` request: this can be used to add some **authentication** parameters, for instance. The default method behaves like a `proxy` receiving and returning the default `headers` map (*). In order to add more `headers` parameters this method can be overridden by a function that receives and returns the `headers` map as well, but it does something in the middle. See below an example:

```javascript
// this is the default method
Loggerhead.setHeaders = function(headers) {
  return headers;
}

// this overrides the default method adding the `X-CSRF-Token` parameters in the `headers` map
Loggerhead.setHeaders = function(headers) {
  headers.set('X-CSRF-Token', '<my-token-value>');
  return headers;
}
```

(*) Note: by default `headers` contains only `{'Content-Type': 'application/json; charset=utf-8')}`

## Installation
```
npm install loggerhead-module
```

## How to use
```javascript
  /* Minimal code to get Loggerhead working properly */
  const Loggerhead = require('loggerhead-module').create({ url: 'https://httpbin.org/post' });


  /* Let's use Loggerhead functions to send some log messages */
  Loggerhead.info('This is an info log message');
  Loggerhead.warning('This is an warning log message')
      .then(confirm => alert(confirm))
      .catch(error => alert(error));

  /* Let's disable debug log level */
  Loggerhead.set({ levels: { debug : false }});

  /* Let's disable info and debug levels for the console */
  Loggerhead.set({ console: { info : false, debug: false }});
```

## Use case
This `module` can be used in a browser scenario, adding `listeners` for specific `events` and `callback` log functions in order to send and store log messages about the `event` that just triggered the `Loggerhead`.

```javascript
  // store a log message about the page has been loaded
  window.addEventListener('load', function(event) {
    Loggerhead.info('[' + new Date().toUTCString() + '] - Loading `' + window.location + '`');
  });
  // store a log message about a page has been left
  window.addEventListener('unload', function(event) {
    Loggerhead.info('[' + new Date().toUTCString() + '] - Leaving `' + window.location + '`');
  });
  // store a log message about the error that just happened
  window.addEventListener('error', function(event) {
    // Note that col & error are new to the HTML 5 and may not be supported in every browser.
    var extra = !event.colno ? '' : '\ncolumn: ' + event.colno;
    extra += !event.error ? '' : '\nerror: ' + event.error;
    const errorMessage = event.message + '\nurl: ' + event.filename + '\nline: ' + event.lineno + extra;
    Loggerhead.error(errorMessage);
  });
```


## Config parameters
```javascript
// the server endpoint where to send logs
url: String,

// log levels, enabled by default
levels: {
  info: Boolean,
  debug: Boolean,
  warning: Boolean,
  error: Boolean,
}

// console log levels, enabled by default
console: {
  info: Boolean,
  debug: Boolean,
  warning: Boolean,
  error: Boolean,
}
```

Parameters are configurable passing a *partial* or *complete* config object with desired values at the beginning to the `create` method call, or later on to the `set` method:

```javascript
const Loggerhead = require('loggerhead-module').create({ url: 'https://httpbin.org/post' });

Loggerhead.set(
  {
    url: 'http://myserver.com/my-frontend-log-endpoint',
    levels: {
      debug: false,
      warning: false,
    },
    console: {
      info: false,
      debug: false,
    }
  }
);
```
