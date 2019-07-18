module.exports = function ({ messages, dbModels }, helper) {

  function example(req, res, next) {
    try {
      req.hasUserAccess = false;
      //some code here
      next();
    } catch (ex) {
      return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR);
    }
  }

  return {
    example: example
  };

};
