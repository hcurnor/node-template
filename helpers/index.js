module.exports = function ({ config, jwt, messages, crypto, mongoose, gracenoteApi }) {
  function hashPwd(salt, pwd) {
    const hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd.toString()).digest('hex');
  }

  return {
    consoleAtServerStart: (title, port, env) => {
      console.log('::::::::::::::::::::::::::: Server Status :::::::::::::::::::::::::::::::');
      console.log('Application name: %s', title);
      console.log('Started on: %s', (new Date()));
      console.log('Listening on port: %s', port);
      console.log('Environment: %s', env);
    },
    signJwt: function (data) {
      return jwt.sign(data, config.jwtSecret, {
        expiresIn: config.jwtExpireTime
      });
    },
    verifyJwt: function (token) {
      return jwt.verify(token, config.jwtSecret, {
        algorithm: config.jwtAlgorithm
      });
    },
    decodeJwt: function (token) {
      try {
        return jwt.verify(token, config.jwtSecret, {
          algorithm: config.jwtAlgorithm
        });
      } catch (err) {
        return false;
      }
    },
    sendResponse: function (res, message, data) {
      const responseMessage = {
        success: message.success,
        message: message.message
      };
      if (data) {
        responseMessage.data = data;
      }
      return res.status(message.code).json(responseMessage);
    },
    sendValidationError: function (res, error) {
      const responseMessage = {
        success: false,
        message: error
      };
      return res.status(messages.INVALID_INPUT.code).json(responseMessage);
    },
    authenticate: function (salt, passwordToMatch, userPassword) {
      return hashPwd(salt, passwordToMatch) === userPassword;
    },
    createSalt: function () {
      return crypto.randomBytes(128).toString('base64');
    },
    hashPwd: hashPwd,
    urlFound: function (array, path) {
      for (let i = 0; i < array.length; i++) {
        if (path.includes(array[i].path)) {
          return true;
        }
      }
      return false;
    },
    generateObjectId: function (id) {
      if (id) {
        return mongoose.Types.ObjectId(id);
      } else {
        return mongoose.Types.ObjectId();
      }
    },
    copyObjects: function (a, propToExclude) {
      const obj = JSON.parse(JSON.stringify(a));
      if (propToExclude) {
        for (let i = 0; i < propToExclude.length; i++) {
          delete obj[propToExclude[i]];
        }
      }
      return obj;
    }
  };
};
