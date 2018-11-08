'use strict';

const fetch = require('node-fetch');

function create(set_config) {
  var _loggerhead = {};

  // configuration object
  var _config = {
    url: '',
    levels: {info: true, debug: true, warning: true, error: true},
    console: {info: true, debug: true, warning: true, error: true},
    events: {load: true, unload: true, error: true},
  };

  _loggerhead.setHeaders = function(headers) {
    return headers;
  }

  // private function
  function postData(data) {
    if (_config.url == '') {
      const errorMessage = '[Loggerhead] ERROR: no server enpoint URL set to send the POST request!! ';
      if(_config.console.error) {
        console.error(errorMessage);
      }
      return new Promise((resolve, reject) => reject(errorMessage));
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
    const result = fetch(_config.url, opts)
        .then(response => { return response.json();})
        .catch(error =>
          {
            if(_config.console.error) {
              const errorMessage =
                'Error trying to send log message to `' +
                _config.url +
                '`\n\n' +
                'POST JSON data was = ' +
                JSON.stringify(opts) +
                '\n\n' +
                error;
              console.error(errorMessage, error);
            }
          }
        );
    return result;
  }

  // log level functions
  _loggerhead.info = function(message) {
    var ret = new Promise(function(resolve, reject) { resolve() });
    if (_config.levels.info) {
      ret = postData({'level' : 'info', 'message' : message});
    }
    if(_config.console.info) {
      console.info(message);
    }
    return ret;
  }
  _loggerhead.debug = function(message) {
    var ret = new Promise(function(resolve, reject) { resolve() });
    if (_config.levels.debug) {
      ret = postData({'level' : 'debug', 'message' : message});
    }
    if(_config.console.debug) {
      console.debug(message);
    }
    return ret;
  }
  _loggerhead.warning = function(message) {
    var ret = new Promise(function(resolve, reject) { resolve() });
    if (_config.levels.warning) {
      ret = postData({'level' : 'warning', 'message' : message});
    }
    if(_config.console.warning) {
      console.warn(message);
    }
    return ret;
  }
  _loggerhead.error = function(message) {
    var ret = new Promise(function(resolve, reject) { resolve() });
    if (_config.levels.error) {
      ret = postData({'level' : 'error', 'message' : message});
    }
    if(_config.console.error) {
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
    if (configObject != null) {
      setMapFromObject(configObject, _config);
    }
  }
  // let's use the set method on the configuration object passed as an argument, if any
  _loggerhead.set(set_config);

  return _loggerhead;
}

module.exports = {
  create : create
}
