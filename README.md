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

By default all levels are enabled. Whenever a log level function is called, it receives a string message, and it prepares a `POST` request and it forwards the message to the set `URL`, injecting in the data the `log level` as well.

### Events
By default `Loggerhead.js` handles some `window event` by pre-configured `listener`s.

Those `events` are:
* `load`: it sends an `info` log level message containing the `DateTime` and the current `URL` page the browser loads
* `unload`: same behavior of the `load` listener, but for unloading pages
* `error`: it sends an `error` log level message containing some details of the error event that just happened


## How to use
```html
<script type="text/javascript" src="loggerhead.js"></script>

<script type="text/javascript">
  const Lh = window.Loggerhead;
  Lh.set({ url : 'https://httpbin.org/post' });
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
