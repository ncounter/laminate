# Laminate
A simple plain Javascript plugin to Log frontend messages via a POST request.

## How to use
```html
<script type="text/javascript" src="laminate.js"></script>

<script type="text/javascript">
  const Log = window.Laminate;
  Log.setBackendURL('https://httpbin.org/post');
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

// on an error event, alert the error message - enabled by default
alertOnErrorLevel: true,

// on a submitted POST request to send logs, alert the message - enabled by default
alertOnSendingData: true,
```

Parameters are configurable via specific endpoints:

- `setBackendURL(newUrl)`: newUrl is a `String` like *http://myserver.com/my-frontend-log-endpoint*

- `enableLogLevels(flags)`: flags is a `Map<string, boolean>` like
  ```javascript
  {'info': true, 'debug': true, 'warning': false, 'error': true}
  ```

- `enableAlertOnErrorLevel(flag)`: flag is a `boolean`

- `enableAlertOnSendingData(flag)`: flag is a `boolean`
