module.exports = function (dependencies, helper) {

  const router = dependencies.express.Router();

  const middlewares = require('../middlewares')(dependencies, helper);
  const services = require('../services')(dependencies, helper);

  function setup(dir) {
    const items = dependencies.fs.readdirSync(dir);

    items.forEach(function (item) {
      const fullPath = dependencies.path.join(dir, item),
        st = dependencies.fs.statSync(fullPath);

      if (st.isDirectory()) {
        setup(fullPath);
      } else {
        if (/\.js$/i.test(item)) {
          require(fullPath).setupFunction(dependencies, helper, middlewares.ROUTE, services);
          registerAPI(require(fullPath).apis);
        }
      }
    });
  }

  function registerAPI(module) {
    for (const prop in module) {
      if (module.hasOwnProperty(prop)) {
        registerMethod(
          module[prop].method,
          module[prop].prefix.concat(module[prop].route),
          module[prop].handler,
          module[prop].middlewares);
      }
    }
  }

  function registerMethod(method, route, handler, middlewares) {

    switch (method) {
      case 'get' :
        router.get(route, middlewares || [], handler);
        break;
      case 'post' :
        router.post(route, middlewares || [], handler);
        break;
      case 'put' :
        router.put(route, middlewares || [], handler);
        break;
      case 'delete' :
        router.delete(route, middlewares || [], handler);
        break;
      default :
        console.log('Unknown method ', method);
        break;
    }
  }

  function registerAPPLevelMiddleware(middlewares) {
    dependencies.app.use(middlewares);
  }

  registerAPPLevelMiddleware(middlewares.APP);

  setup(dependencies.config.rootPath + dependencies.config.apiDir);

  dependencies.app.use(router);
};
