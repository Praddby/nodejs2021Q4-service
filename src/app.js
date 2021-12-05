const fastify = require('fastify')({ logger: true });
const AutoLoad = require('fastify-autoload');
const swagger = require('fastify-swagger');
const path = require('path');

fastify.register(swagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'REST service API' },
  },
});

fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  dirNameRoutePrefix: false,
  options: {},
});

module.exports = fastify;
