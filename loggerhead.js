(function(window){
  // 'use strict';

  function Loggerhead(){
    var _loggerheadObject = {};

    var config = {
      postDataURL: '',
      levels:
        {
          info: true,
          debug: false,
          warning: false,
          error: true
        },
      alertOnLogErrorLevel: true,
      alertOnSendingData: true,
    };

    function formatPostDataErrorMessage(opts, error) {
      return 'Error trying to send log message to "' + config.postDataURL + '"\n\n' +
          'POST JSON data was = ' + JSON.stringify(opts) +
          '\n\n' + error;
    }

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
          .catch(error =>
            {
              const errorMessage = formatPostDataErrorMessage(opts, error);
              console.error(errorMessage, error);
              if (config.alertOnSendingData) {
                alert(errorMessage);
              }
            }
          );
      return result;
    }
    _loggerheadObject.info = function(message) {
      let ret;
      if (config.levels.info) {
        ret = postData({'level' : 'info', 'message' : message});
      }
      else {
        console.log('Loggerhead.info has been called but it is disabled');
      }
      return ret;
    }
    _loggerheadObject.debug = function(message) {
      let ret;
      if (config.levels.debug) {
        ret = postData({'level' : 'debug', 'message' : message});
      }
      else {
        console.log('Loggerhead.debug has been called but it is disabled');
      }
      return ret;
    }
    _loggerheadObject.warning = function(message) {
      let ret;
      if (config.levels.warning) {
        re = postData({'level' : 'warning', 'message' : message});
      }
      else {
        console.log('Loggerhead.warning has been called but it is disabled');
      }
      return ret;
    }
    _loggerheadObject.error = function(message) {
      let ret;
      if (config.levels.error) {
        ret = postData({'level' : 'error', 'message' : message}).then(alertOnLogErrorLevel(message));
      }
      else {
        console.log('Loggerhead.error has been called but it is disabled');
      }
      return ret;
    }

    function alertOnLogErrorLevel(message) {
      if(config.alertOnLogErrorLevel) {
        alert('An unhandled error occurred - ' + message);
      }
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
    _loggerheadObject.enableAlertOnLogErrorLevel = function(flag) {
      config.alertOnLogErrorLevel = flag;
    }
    _loggerheadObject.enableAlertOnSendingData = function(flag) {
      config.alertOnSendingData = flag;
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
