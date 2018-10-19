# Loggerhead
A simple plain Javascript plugin to log frontend messages to a server.

## How it works
`Loggerhead.js` sends a log message to a configurable endpoint URL by a POST request each time one of the `log level` function is called.

### Log levels
Log levels are
* `info`
* `debug`
* `warning`
* `error`

By default all levels are enabled. Whenever a log level function is called, it receives a string message, it prepares a `POST` request and it forwards the message to the set `URL`, injecting in the `POST` data the `log level` information.

**Note**: each log level function returns the `Promise` that sends the `POST` request, this way it is possible to add a `.then()` slice in order to apply some other action on the `response` (if any) from the server after storing the log message. See an example below:
```javascript
Lh.info('Send this info log message to the server')
    .then(serverResponse => alert(serverResponse.message));
```

### Events
By default `Loggerhead.js` handles also some `window event` (the typical types a user wants to store a log for) by pre-configured `listener`s: they callback a dedicated built-in function per each type of `event`.

Types of `events` it listens for are:
* `load`: it sends an `info` log level message containing the `DateTime` and the current `URL` page the browser loads
* `unload`: same behavior of the `load` listener, but for unloading pages
* `error`: it sends an `error` log level message containing some details of the error event that just happened

These built-in functions are named following the pattern `<eventName>EventListener` (e.g.: [`loadEventListener`, `unloadEventListener`, `errorEventListener`]), they receive the `event` object as a parameter, and they can be overridden like the following:

```javascript
Lh.loadEventListener = (event) => console.log(event);
Lh.unloadEventListener = (event) => console.log(event);
Lh.errorEventListener = (event) => alert(event.message);
```

## How to use
```html
<script type="text/javascript" src="loggerhead.js"></script>

<script type="text/javascript">
  /* Minimal code to get Loggerhead working properly */
  const Lh = window.Loggerhead;
  Lh.set({ url : 'https://httpbin.org/post' });

  /* Let's use Loggerhead functions to send some log messages */
  Lh.info('This is an info log message');
  Lh.warning('This is an warning log message')
      .then(confirm => alert(confirm));

  /* Let's disable debug log level */
  Lh.set({ debug : false });
</script>
```

## Config parameters
```javascript
// the server endpoint where to send logs
url : String,

// log levels, enabled by default
info: Boolean,
debug: Boolean,
warning: Boolean,
error: Boolean,
```

Parameters are configurable passing a *partial* or *complete* config object with desired values to the `set` method:

```javascript
Lh.set(
  {
    url : 'http://myserver.com/my-frontend-log-endpoint',
    debug: false,
    warning: false,
  }
);
```
