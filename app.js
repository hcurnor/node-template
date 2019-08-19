// .env file is necessary on project root level
// if (require('dotenv').config().error) {
//   throw '.env file is missing';
// }

const express = require('express'),
  app = express(),
  config = require('./configs/config'),
  dependencies = require('./configs/dependencies')(app, express, config),
  helper = require('./helpers')(dependencies);
require('./configs/express')(dependencies);

// Setting up local variables.
app.locals.title = config.appTitle;
app.locals.env = config.env;
app.locals.port = config.port;

// Start listening
const server = app.listen(app.locals.port, () => {
  helper.consoleAtServerStart(app.locals.title, app.locals.port, app.locals.env);
});

dependencies.socketService = require('./configs/socketService')(dependencies, server, helper);
require('./router')(dependencies, helper);
