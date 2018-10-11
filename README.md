# Laminate
A simple plain Javascript plugin to Log frontend messages via a POST request.

## How to use
```
<script type="text/javascript" src="laminate.js"></script>

<script type="text/javascript">
  const Log = window.Laminate;
  Log.setBackendURL('https://httpbin.org/post');
</script>
```