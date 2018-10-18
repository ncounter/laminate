(function(window){
  // 'use strict';

  function Loggerhead(){
    var _loggerheadObject = {};

    // configuration object
    var config = {
      postDataURL: '',
      levels:
        {
          info: true,
          debug: false,
          warning: false,
          error: true
        },
    };

    // private functions
    function formatPostDataErrorMessage(opts, error) {
      return 'Error trying to send log message to "' + config.postDataURL + '"\n\n' +
          'POST JSON data was = ' + JSON.stringify(opts) + '\n\n' + error;
    }
    function postData(data) {
      const opts = {
        method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        redirect: 'follow', referrer: 'no-referrer',
        body: JSON.stringify(data),
      }
      const result = fetch(config.postDataURL, opts)
          .then(function (response) { return response.json();})
          .catch(error =>
            {
              const errorMessage = formatPostDataErrorMessage(opts, error);
              console.error(errorMessage, error);
            }
          );
      return result;
    }

    // public functions
    _loggerheadObject.info = function(message) {
      var ret = new Promise(function(resolve, reject) { resolve() });
      if (config.levels.info) {
        ret = postData({'level' : 'info', 'message' : message});
      }
      return ret;
    }
    _loggerheadObject.debug = function(message) {
      var ret = new Promise(function(resolve, reject) { resolve() });
      if (config.levels.debug) {
        ret = postData({'level' : 'debug', 'message' : message});
      }
      return ret;
    }
    _loggerheadObject.warning = function(message) {
      var ret = new Promise(function(resolve, reject) { resolve() });
      if (config.levels.warning) {
        ret = postData({'level' : 'warning', 'message' : message});
      }
      return ret;
    }
    _loggerheadObject.error = function(message) {
      var ret = new Promise(function(resolve, reject) { resolve() });
      if (config.levels.error) {
        ret = postData({'level' : 'error', 'message' : message});
      }
      return ret;
    }

    _loggerheadObject.setBackendURL = function(newUrl) {
      config.postDataURL = newUrl;
    }
    _loggerheadObject.enableLogLevels = function(flags) {
      config.levels.info = flags.info;
      config.levels.devug = flags.debug;
      config.levels.warning = flags.warning;
      config.levels.error = flags.error;
    }
    return _loggerheadObject;
  }

  if(typeof(window.Loggerhead) === 'undefined'){
    window.Loggerhead = Loggerhead();
    window.addEventListener('load', function() {
      window.Loggerhead.info('[' + new Date().toUTCString() + '] - Loading "' + window.location + '"');
    })
    window.addEventListener('error', function(event) {
      // Note that col & error are new to the HTML 5 and may not be supported in every browser.
      var extra = !event.colno ? '' : '\ncolumn: ' + event.colno;
      extra += !event.error ? '' : '\nerror: ' + event.error;

      window.Loggerhead.error(event.message + "\nurl: " + event.filename + "\nline: " + event.lineno + extra);
    });
    window.addEventListener('unload', function() {
      window.Loggerhead.info('[' + new Date().toUTCString() + '] - Leaving "' + window.location + '"');
    });
  }
})(window);
