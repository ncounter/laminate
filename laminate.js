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
        },
      alertOnErrorLevel: true,
      alertOnSendingData: true,
    };

    function formatPostDataErrorMessage(opts) {
      return 'Error trying to send log message to "' + config.postDataURL + '" . Json log data was = ' + JSON.stringify(opts);
    }

    function postData(data) {
      const opts = {
        method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
      }
      const result = fetch(config.postDataURL + '', opts)
          .then(function (response) { return response.json();})
          .catch(error =>
            {
              const errorMessage = formatPostDataErrorMessage(opts);
              console.error(errorMessage);
              if (config.alertOnSendingData) {
                alert(errorMessage);
              }
            }
          );
      return result;
    }
    _laminateObject.info = function(message) {
      let ret;
      if (config.levels.info) {
        ret = postData({'level' : 'info', 'message' : message});
      }
      else {
        console.log('Laminate.info has been called but it is disabled');
      }
      return ret;
    }
    _laminateObject.debug = function(message) {
      let ret;
      if (config.levels.debug) {
        ret = postData({'level' : 'debug', 'message' : message});
      }
      else {
        console.log('Laminate.debug has been called but it is disabled');
      }
      return ret;
    }
    _laminateObject.warning = function(message) {
      let ret;
      if (config.levels.warning) {
        re = postData({'level' : 'warning', 'message' : message});
      }
      else {
        console.log('Laminate.warning has been called but it is disabled');
      }
      return ret;
    }
    _laminateObject.error = function(message) {
      let ret;
      if (config.levels.error) {
        ret = postData({'level' : 'error', 'message' : message}).then(alertOnErrorLevel(message));
      }
      else {
        console.log('Laminate.error has been called but it is disabled');
      }
      return ret;
    }

    function alertOnErrorLevel(message) {
      if(config.alertOnErrorLevel) {
        alert('An unhandled error occurred - ' + message);
      }
    }

    _laminateObject.setBackendURL = function(newUrl) {
      config.postDataURL = newUrl;
    }
    _laminateObject.enableLogLevels = function(flags) {
      config.levels.info = flags.info;
      config.levels.devug = flags.debug;
      config.levels.warning = flags.warning;
      config.levels.error = flags.error;
    }
    _laminateObject.enableAlertOnError = function(flag) {
      config.alertOnError = flag;
    }
    _laminateObject.enableAlertOnSendingData = function(flag) {
      config.alertOnSendingData = flag;
    }
    return _laminateObject;
  }

  if(typeof(window.Laminate) === 'undefined'){
    window.Laminate = Laminate();
    window.addEventListener('load', function() {
      window.Laminate.info('[' + new Date().toUTCString() + '] - Loading "' + window.location + '"');
    })
    window.addEventListener('error', function(event) {
      // Note that col & error are new to the HTML 5 and may not be supported in every browser.
      var extra = !event.colno ? '' : '\ncolumn: ' + event.colno;
      extra += !event.error ? '' : '\nerror: ' + event.error;

      window.Laminate.error(event.message + "\nurl: " + event.filename + "\nline: " + event.lineno + extra);
    });
    window.addEventListener('unload', function() {
      window.Laminate.info('[' + new Date().toUTCString() + '] - Leaving "' + window.location + '"');
    });
  }
})(window);
