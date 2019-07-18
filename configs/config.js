const path = require('path');
const rootPath = path.normalize(__dirname + '/../');

module.exports = {
  appTitle: 'node-template',
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || '8080',
  dbUrl: process.env.DB_URL,
  rootPath: rootPath,
  jwtAlgorithm: 'RS256',
  jwtSecret: 'somerandomstring',
  jwtExpireTime: 604800,
  accessCodeJwtExpireTime: '1y',
  defaultTimeOut: 240000,
  logStyle: 'dev',
  timeZone: 'America/Los_Angeles',
  apiDir: '/apis',
  apiPrefix: {
    api: '/api',
    auth: '/auth',
    public: '/public'
  },
  excludeUserFields: ['password', 'salt'],
  socketChannels: {
    //server will fire to client
    sendDataToClient: 'send-data-to-client',
    //server will receive from client
    receiveDataToClient: 'receive-data-from-client'
  }
};
