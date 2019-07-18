module.exports = function (config, mongoose) {
  mongoose.connect(config.dbUrl);
  const db = mongoose.connection;
  mongoose.Promise = global.Promise;
  db.on('error', function () {
    console.error.bind(console, 'Error in db connection!');
    process.exit();
  });
  db.once('open', function () {
    console.log('Successfully connected to db!');
  });
  return db;
};
