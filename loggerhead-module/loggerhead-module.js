'use strict';

const fetch = require('node-fetch');

function create() {
  var _loggerhead = {};

  // configuration object
  var config = {
    url: '',
    levels: {info: true, debug: true, warning: true, error: true},
    console: {info: false, debug: false, warning: false, error: false},
    events: {load: true, unload: true, error: true},
  };

  _loggerhead.setHeaders = function(headers) {
    return headers;
  }

  // private functions
  function formatPostDataErrorMessage(opts, error) {
    return 'Error trying to send log message to `' + config.url + '`\n\n' +
        'POST JSON data was = ' + JSON.stringify(opts) + '\n\n' + error;
  }
  function postData(data) {
    if (config.url == '') {
      console.warn('[Loggerhead] : no server url set to send the POST request!!');
      return new Promise(resolve => resolve());
    }
    var headers = new Map();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = _loggerhead.setHeaders(headers);
    const opts = {
      method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin',
      headers: headers,
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
  _loggerhead.info = function(message) {
    var ret = new Promise(function(resolve, reject) { resolve() });
    if (config.levels.info) {
      ret = postData({'level' : 'info', 'message' : message});
    }
    if(config.console.info) {
      console.info(message);
    }
    return ret;
  }
  _loggerhead.debug = function(message) {
    var ret = new Promise(function(resolve, reject) { resolve() });
    if (config.levels.debug) {
      ret = postData({'level' : 'debug', 'message' : message});
    }
    if(config.console.debug) {
      console.debug(message);
    }
    return ret;
  }
  _loggerhead.warning = function(message) {
    var ret = new Promise(function(resolve, reject) { resolve() });
    if (config.levels.warning) {
      ret = postData({'level' : 'warning', 'message' : message});
    }
    if(config.console.warning) {
      console.warn(message);
    }
    return ret;
  }
  _loggerhead.error = function(message) {
    var ret = new Promise(function(resolve, reject) { resolve() });
    if (config.levels.error) {
      ret = postData({'level' : 'error', 'message' : message});
    }
    if(config.console.error) {
      console.error(message);
    }
    return ret;
  }

  function setMapFromObject(fromObj, toMap) {
    const fromMap = new Map(Object.entries(fromObj));
    Array.from(fromMap.keys()).map(k => {
      if (toMap[k] != null && fromMap.get(k) instanceof Object) {
        setMapFromObject(fromMap.get(k), toMap[k]);
      }
      else {
        toMap[k] = fromMap.get(k);
      }
    });
  }

  // configuration parameters setter
  _loggerhead.set = function(configObject) {
    setMapFromObject(configObject, config);
  }

  return _loggerhead;
}

module.exports = {
  create : create
}
