(function(window){
  // 'use strict';

  function Laminate(){
    var _laminateObject = {};

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
    _laminateObject.info = function(message) {
      return postData({'level' : 'info', 'message' : message});
    }
    _laminateObject.debug = function(message) {
      return postData({'level' : 'debug', 'message' : message});
    }
    _laminateObject.warning = function(message) {
      return postData({'level' : 'warning', 'message' : message});
    }
    _laminateObject.error = function(message) {
      return postData({'level' : 'error', 'message' : message});
    }

    _laminateObject.setBackendURL = function(newUrl) {
      _POST_DATA_URL = newUrl;
    }
    return _laminateObject;
  }

  if(typeof(window.Laminate) === 'undefined'){
    window.Laminate = Laminate();
  }
})(window);
