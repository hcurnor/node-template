module.exports = function ({ app, config, express, cors, bodyParser, morgan, path }) {
  app.use(cors());
  app.use(morgan(config.logStyle));
  app.use(bodyParser.json({ limit: '80mb' }));
  app.use(bodyParser.urlencoded({
    limit: '80mb',
    extended: true
  }));
  app.use(express.static(path.join(config.rootPath, 'uploads')));
};
