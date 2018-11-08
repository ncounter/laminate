# Loggerhead
A simple plain Javascript plugin to send frontend log messages to a server.

Note: `Loggerhead` is available in **npm module** version as well.
 - [npm module package](https://www.npmjs.com/package/loggerhead-module)
 - [git repo](https://github.com/ncounter/loggerhead/tree/master/loggerhead-module) - *it is just an internal subfolder of the current `Loggerhead.js` git repo project*

## How it works
`Loggerhead.js` sends a log message to a configurable endpoint URL by a POST request each time one of the `log level` function is called.

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

### Events
By default `Loggerhead.js` handles also some `window event` (the typical types a user wants to store a log for) by pre-configured `listener`s: they callback a dedicated built-in function per each type of `event`.

Types of `events` it listens for are:
* `load`: it sends an `info` log level message containing the `DateTime` and the current `URL` page the browser loads
* `unload`: same behavior of the `load` listener, but for unloading pages
* `error`: it sends an `error` log level message containing some details of the error event that just happened

These built-in functions are named following the pattern `<eventName>EventListener` (e.g.: [`loadEventListener`, `unloadEventListener`, `errorEventListener`]), they receive the `event` object as a parameter, and they can be overridden like the following:

```javascript
Loggerhead.loadEventListener = (event) => console.log(event);
Loggerhead.unloadEventListener = (event) => console.log(event);
Loggerhead.errorEventListener = (event) => alert(event.message);
```

### Headers
`Loggerhead.js` provides also a way to customize `headers` values of the `POST` request: this can be used to add some **authentication** parameters, for instance. The default method behaves like a `proxy` receiving and returning the default `headers` map (*). In order to add more `headers` parameters this method can be overridden by a function that receives and returns the `headers` map as well, but it does something in the middle. See below an example:

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

## How to use
```html
<script type="text/javascript" src="loggerhead.js"></script>

<script type="text/javascript">
  /* Minimal code to get Loggerhead working properly */
  Loggerhead.set({ url: 'https://httpbin.org/post' });

  /* Let's use Loggerhead functions to send some log messages */
  Loggerhead.info('This is an info log message');
  Loggerhead.warning('This is an warning log message')
      .then(confirm => alert(confirm))
      .catch(error => alert(error));

  /* Let's disable debug log level */
  Loggerhead.set({ levels: { debug : false }});

  /* Let's disable info and debug levels for the console */
  Loggerhead.set({ console: { info : false, debug: false }});
</script>
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

// built-in event handlers, enabled by default
events: {
  load: Boolean,
  unload: Boolean,
  error: Boolean,
}
```

Parameters are configurable passing a *partial* or *complete* config object with desired values to the `set` method:

```javascript
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
    },
    events: {
      unload: false
    }
  }
);
```
