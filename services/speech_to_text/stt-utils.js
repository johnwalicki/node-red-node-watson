const pkg = require('../../package.json'),
  STTV1 = require('watson-developer-cloud/speech-to-text/v1');

class STTUtils {
  constructor() {
  }

  static initSTTService(req, sApikey, sUsername, sPassword, sEndpoint) {
    const endpoint = req.query.e ? req.query.e : sEndpoint;

    let serviceSettings = {
      url: endpoint,
      headers: {
        'User-Agent': pkg.name + '-' + pkg.version
      }
    };

    if (sApikey || req.query.key) {
      serviceSettings.iam_apikey = sApikey ? sApikey : req.query.key;
    } else {
      serviceSettings.username = sUsername ? sUsername : req.query.un;
      serviceSettings.password = sPassword ? sPassword : req.query.pwd;
    }

    return new STTV1(serviceSettings);
  }

  static determineService(apikey, username, password, endpoint) {
    let serviceSettings = {
      headers: {
        'User-Agent': pkg.name + '-' + pkg.version
      }
    };

    if (apikey) {
      serviceSettings.iam_apikey = apikey;
    } else {
      serviceSettings.username = username;
      serviceSettings.password = password;
    }

    if (endpoint) {
      serviceSettings.url = endpoint;
    }

    return new STTV1(serviceSettings);
  }

}

module.exports = STTUtils;
