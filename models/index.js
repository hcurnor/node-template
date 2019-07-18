module.exports = function (mongoose) {

  const Schema = mongoose.Schema;
  const models = {};

  const User = require('./user')(Schema);
  const Jwt = require('./jwt')(Schema);

  models.User = mongoose.model('User', User);
  models.Jwt = mongoose.model('Jwt', Jwt);

  return models;
};
