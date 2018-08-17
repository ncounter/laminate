(function(window){
  // 'use strict';

  function Laminate(){
    var _laminateObject = {};

    var config = {
      postDataURL: '',
      levels:
        {
          info: true,
          debug: false,
          warning: false,
          error: true
        }
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
      if (config.levels.info) {
        return postData({'level' : 'info', 'message' : message});
      }
      else {
        console.log('Laminate.info has been called but it is disabled');
      }
    }
    _laminateObject.debug = function(message) {
      if (config.levels.debug) {
        return postData({'level' : 'debug', 'message' : message});
      }
      else {
        console.log('Laminate.debug has been called but it is disabled');
      }
    }
    _laminateObject.warning = function(message) {
      if (config.levels.warning) {
        return postData({'level' : 'warning', 'message' : message});
      }
      else {
        console.log('Laminate.warning has been called but it is disabled');
      }
    }
    _laminateObject.error = function(message) {
      if (config.levels.error) {
        return postData({'level' : 'error', 'message' : message})
            .then(alert('An unhandled error occurred: ' + message));
      }
      else {
        console.log('Laminate.error has been called but it is disabled');
      }
    }

    _laminateObject.setBackendURL = function(newUrl) {
      config.postDataURL = newUrl;
    }
    return _laminateObject;
  }

  if(typeof(window.Laminate) === 'undefined'){
    window.Laminate = Laminate();
    window.addEventListener('load', function() {
      window.Laminate.info('[' + new Date().toUTCString() + '] - Loading "' + window.location + '"');
    })
    window.addEventListener('error', function(msg, url, line, col, error) {
        // Note that col & error are new to the HTML 5 and may not be supported in every browser.
        var extra = !col ? '' : '\ncolumn: ' + col;
        extra += !error ? '' : '\nerror: ' + error;

        window.Laminate.error(msg + "\nurl: " + url + "\nline: " + line + extra);
    });
    window.addEventListener('unload', function() {
      window.Laminate.info('[' + new Date().toUTCString() + '] - Leaving "' + window.location + '"');
    });
  }
})(window);
