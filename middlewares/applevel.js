module.exports = function ({ jwtWhiteSheet, messages, dbModels }, helper) {
  // This middleware get all the inputs from params ,query ,body and place them in req.inputs
  function getInputs(req, res, next) {
    req.inputs = {};
    for (const prop in  req.body) {
      if (req.body.hasOwnProperty(prop)) {
        req.inputs[prop] = req.body[prop];
      }
    }
    for (const prop in  req.query) {
      if (req.query.hasOwnProperty(prop)) {
        req.inputs[prop] = req.query[prop];
      }
    }
    for (const prop in  req.params) {
      if (req.params.hasOwnProperty(prop)) {
        req.inputs[prop] = req.params[prop];
      }
    }
    next();
  }

  // this middleware will check the public api's url and let you go to the next function
  async function jwtValidation(req, res, next) {
    try {
      if (helper.urlFound(jwtWhiteSheet, req.path)) {
        req.jwtRequired = false;
        return next();
      }
      const token = req.body['access-token'] || req.query['access-token'] || req.headers['access-token'];
      if (token) {
        let result = await dbModels.Jwt.aggregate([
          {
            $match: { jwt: token }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'user'

            }
          },
          { $unwind: '$user' }
        ]);
        if (result && result.length > 0) {
          result = result[0];
          req['userDetails'] = result.user;
          req['jwt'] = token;
          req.jwtRequired = true;
          next();
        } else {
          return helper.sendResponse(res, messages.TOKEN_EXPIRED);
        }
      } else {
        return helper.sendResponse(res, messages.TOKEN_INVALID);
      }
    } catch (ex) {
      return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR);
    }
  }

  // Array Order of the middleware Matters so we follow FIFO
  return [
    jwtValidation,
    getInputs
  ];
};
