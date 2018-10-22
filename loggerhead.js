(function(window){
  // 'use strict';

  function Loggerhead(){
    var _loggerheadObject = {};

    // configuration object
    var config = {
      postDataURL: '',
      info: true,
      debug: true,
      warning: true,
      error: true,
    };

    // private functions
    function formatPostDataErrorMessage(opts, error) {
      return 'Error trying to send log message to `' + config.url + '`\n\n' +
          'POST JSON data was = ' + JSON.stringify(opts) + '\n\n' + error;
    }
    function postData(data) {
      const opts = {
        method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        redirect: 'follow', referrer: 'no-referrer',
        body: JSON.stringify(data),
      }
      const result = fetch(config.url, opts)
          .then(function (response) { return response.json();})
          .catch(error =>
            {
              const errorMessage = formatPostDataErrorMessage(opts, error);
              console.error(errorMessage, error);
            }
          );
      return result;
    }

    // log level functions
    _loggerheadObject.info = function(message) {
      var ret = new Promise(function(resolve, reject) { resolve() });
      if (config.info) {
        ret = postData({'level' : 'info', 'message' : message});
      }
      return ret;
    }
    _loggerheadObject.debug = function(message) {
      var ret = new Promise(function(resolve, reject) { resolve() });
      if (config.debug) {
        ret = postData({'level' : 'debug', 'message' : message});
      }
      return ret;
    }
    _loggerheadObject.warning = function(message) {
      var ret = new Promise(function(resolve, reject) { resolve() });
      if (config.warning) {
        ret = postData({'level' : 'warning', 'message' : message});
      }
      return ret;
    }
    _loggerheadObject.error = function(message) {
      var ret = new Promise(function(resolve, reject) { resolve() });
      if (config.error) {
        ret = postData({'level' : 'error', 'message' : message});
      }
      return ret;
    }

    // configuration parameters setter
    _loggerheadObject.set = function(configObject) {
      const configMap = new Map(Object.entries(configObject));
      Array.from(configMap.keys()).map(k => config[k] = configMap.get(k));
    }

    // built-in event listeners
    _loggerheadObject.loadEventListener = function(event) {
      this.info('[' + new Date().toUTCString() + '] - Loading `' + window.location + '`');
    }
    _loggerheadObject.unloadEventListener = function(event) {
      this.info('[' + new Date().toUTCString() + '] - Leaving `' + window.location + '`');
    }
    _loggerheadObject.errorEventListener = function(event) {
      // Note that col & error are new to the HTML 5 and may not be supported in every browser.
      var extra = !event.colno ? '' : '\ncolumn: ' + event.colno;
      extra += !event.error ? '' : '\nerror: ' + event.error;

      const errorMessage = event.message + '\nurl: ' + event.filename + '\nline: ' + event.lineno + extra;
      this.error(errorMessage);
    }
    return _loggerheadObject;
  }

  if(typeof(window.Loggerhead) === 'undefined'){
    window.Loggerhead = Loggerhead();
    window.addEventListener('load', function(event) { window.Loggerhead.loadEventListener(event) });
    window.addEventListener('unload', function(event) { window.Loggerhead.unloadEventListener(event) });
    window.addEventListener('error', function(event) { window.Loggerhead.errorEventListener(event) });
  }
})(window);
