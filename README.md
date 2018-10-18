# Loggerhead
A simple plain Javascript plugin to log frontend messages via a POST request.

## How to use
```html
<script type="text/javascript" src="loggerhead.js"></script>

<script type="text/javascript">
  const Lh = window.Loggerhead;
  Lh.setBackendURL('https://httpbin.org/post');
</script>
```

## Config parameters
```javascript
// the server endpoint where to send logs
postDataURL: '',

// log levels map
levels:
  {
    'info': true, // enabled by default
    'debug': false, // disabled by default
    'warning': false, // disabled by default
    'error': true // enabled by default
  },
```

Parameters are configurable via specific endpoints:

- `setBackendURL(newUrl)`: newUrl is a `String` like *http://myserver.com/my-frontend-log-endpoint*

- `enableLogLevels(flags)`: flags is a `Map<string, boolean>` like
  ```javascript
  {'info': true, 'debug': true, 'warning': false, 'error': true}
  ```
