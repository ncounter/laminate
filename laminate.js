"use strict";

function postData(data) {
  const opts = {
    method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  }

  fetch('https://httpbin.org/post', opts)
  .then(function (response) { return response.json();})
  .then(function (responseJson) { console.log(responseJson) })
  .catch(error => console.error('Fetch Error =\n', error));
}

function info(message) {
  postData({'level' : 'info', 'message' : message});
}
function debug(message) {
  postData({'level' : 'debug', 'message' : message});
}
function warning(message) {
  postData({'level' : 'warning', 'message' : message});
}
function error(message) {
  postData({'level' : 'error', 'message' : message});
}

info('test-info');
debug('test-debug');
warning('test-warning');
error('test-error');