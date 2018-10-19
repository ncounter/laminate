# Loggerhead
A simple plain Javascript plugin to log frontend messages via a POST request.

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
