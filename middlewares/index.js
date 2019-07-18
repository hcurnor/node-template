module.exports = function (dependencies, helper) {

  const middlewares = {};

  middlewares.APP = require('./applevel')(dependencies, helper);
  middlewares.ROUTE = require('./routelevel')(dependencies, helper);

  return middlewares;

};
