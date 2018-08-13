var _POST_DATA_URL = '';

function postData(data) {
  const opts = {
    method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  }
  const result = fetch(_POST_DATA_URL, opts)
  .then(function (response) { return response.json();})
  .catch(error => console.error('Fetch Error =\n', error));
  return result;
}
function info(message) {
  return postData({'level' : 'info', 'message' : message});
}
function debug(message) {
  return postData({'level' : 'debug', 'message' : message});
}
function warning(message) {
  return postData({'level' : 'warning', 'message' : message});
}
function error(message) {
  return postData({'level' : 'error', 'message' : message});
}

function setBackendURL(newUrl) {
  _POST_DATA_URL = newUrl;
}
