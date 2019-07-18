// auth contains company and user related apis
module.exports.setupFunction = function ({ config, messages, validators, dbModels, socketService }, helper, middlewares, services) {

  async function signUp(req, res) {
    try {
      const validation = await validators.validateSignUpInputs(req.body);
      if (!validation.message) {
        const user = await dbModels.User.findOne({ email: req.body.email });
        if (user) {
          return helper.sendResponse(res, messages.EMAIL_EXIST);
        } else {
          const userSalt = helper.createSalt();
          const hashedPass = helper.hashPwd(userSalt, req.body.password);
          const userId = helper.generateObjectId();
          const tokenValues = {
            email: req.body.email,
            date: Date.now(),
            _id: userId
          };
          const token = helper.signJwt(tokenValues);
          const user = new dbModels.User({
            _id: userId,
            email: req.body.email,
            password: hashedPass,
            salt: userSalt,
            name: req.body.name
          });
          const jwtDoc = new dbModels.Jwt({
            user: userId,
            jwt: token
          });
          user.save();
          jwtDoc.save();
          const dataToSend = {
            user: helper.copyObjects(JSON.parse(JSON.stringify(user)), config.excludeUserFields),
            jwt: token
          };
          return helper.sendResponse(res, messages.SUCCESSFUL_SIGNUP, dataToSend);
        }
      } else {
        return helper.sendValidationError(res, validation.message);
      }
    } catch (ex) {
      return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR);
    }
  }

  async function login(req, res) {
    try {
      const validation = await validators.validateLoginInputs(req.body);
      if (!validation.message) {
        const user = await dbModels.User.findOne({ email: req.body.email });
        if (user) {
          if (helper.authenticate(user.salt, req.body.password, user.password)) {
            const tokenValues = {
              email: user.email,
              date: Date.now(),
              _id: user._id
            };
            const token = helper.signJwt(tokenValues);
            const jwtDoc = new dbModels.Jwt({
              user: user._id,
              jwt: token
            });
            jwtDoc.save();
            const dataToSend = {
              user: helper.copyObjects(JSON.parse(JSON.stringify(user)), config.excludeUserFields),
              jwt: token
            };
            return helper.sendResponse(res, messages.SUCCESSFUL_LOGIN, dataToSend);
          } else {
            return helper.sendResponse(res, messages.AUTHENTICATION_FAILED);
          }
        } else {
          return helper.sendResponse(res, messages.AUTHENTICATION_FAILED);
        }
      } else {
        return helper.sendValidationError(res, validation.message);
      }
    } catch (ex) {
      return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR);
    }
  }

  async function getMe(req, res) {
    try {
      const dataToSend = {
        user: helper.copyObjects(req.userDetails, config.excludeUserFields),
        jwt: req.jwt
      };
      return helper.sendResponse(res, messages.SUCCESSFUL, dataToSend);
    } catch (ex) {
      return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR);
    }
  }

  async function logOut(req, res) {
    try {
      await dbModels.Jwt.deleteMany({ user: req.userDetails._id });
      return helper.sendResponse(res, messages.SUCCESSFUL_LOGOUT);
    } catch (ex) {
      return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR);
    }
  }

  async function checkEmail(req, res) {
    try {
      const user = await dbModels.User.findOne({ email: req.body.email });
      if (user && user._id) {
        return helper.sendResponse(res, messages.EMAIL_EXIST);
      }
      return helper.sendResponse(res, messages.EMAIL_DOES_NOT_EXIST);
    } catch (ex) {
      return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR);
    }
  }

  module.exports.apis = {

    signUp: {
      route: '/sign-up',
      method: 'post',
      prefix: config.apiPrefix.auth,
      middlewares: [],
      handler: signUp
    },
    login: {
      route: '/login',
      method: 'post',
      prefix: config.apiPrefix.auth,
      middlewares: [],
      handler: login
    },
    getMe: {
      route: '/me',
      method: 'get',
      prefix: config.apiPrefix.auth,
      middlewares: [],
      handler: getMe
    },
    logOut: {
      route: '/log-out',
      method: 'post',
      prefix: config.apiPrefix.auth,
      middlewares: [],
      handler: logOut
    },
    checkEmail: {
      route: '/check-email',
      method: 'post',
      prefix: config.apiPrefix.auth,
      middlewares: [],
      handler: checkEmail
    },
  };

};
