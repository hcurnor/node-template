module.exports = function (app, express, config) {

  const joi = require('joi'),
    mongoose = require('mongoose'),
    mongoConnection = require('./mongoConnection')(config, mongoose),
    dbModels = require('../models/index')(mongoose);

  return {
    app: app,
    express: express,
    config: config,
    joi: joi,
    moment: require('moment'),
    jwt: require('jsonwebtoken'),
    jwtWhiteSheet: require('./jwtWhiteSheet'),
    multer: require('multer'),
    bodyParser: require('body-parser'),
    morgan: require('morgan'),
    cors: require('cors'),
    path: require('path'),
    fs: require('fs-extra'),
    mongoose: mongoose,
    https: require('https'),
    mongoConnection: mongoConnection,
    dbModels: dbModels,
    crypto: require('crypto'),
    request: require('request'),
    messages: require('./messages'),
    validators: require('../validators')(joi)
  };
};
