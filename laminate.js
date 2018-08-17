(function(window){
  // 'use strict';

  function Laminate(){
    var _laminateObject = {};

    var config = {
      postDataURL: ''
    };

    function postData(data) {
      const opts = {
        method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
      }
      const result = fetch(config.postDataURL, opts)
      .then(function (response) { return response.json();})
      .catch(error => console.error('Error trying to send log message to "' + config.postDataURL + '" . Json log data was = ' + JSON.stringify(opts), error));
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
      config.postDataURL = newUrl;
    }
    return _laminateObject;
  }

  if(typeof(window.Laminate) === 'undefined'){
    window.Laminate = Laminate();
  }
})(window);
