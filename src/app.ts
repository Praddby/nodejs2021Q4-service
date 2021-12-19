import fastify from 'fastify';
import autoLoad from 'fastify-autoload';
import { join } from 'path';
import SwaggerPlugin from 'fastify-swagger';

const app = fastify({
  logger: true,
});

/**
 * FastifyRegister
 *
 * Function for adding a swagger to fastify. 
 */
app.register(SwaggerPlugin, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { 
      title: 'REST service API',
      version: '0.2.0',
    },
  },
});

/**
 * FastifyRegister
 *
 * Function for adding a routes to fastify. 
 */
app.register(autoLoad, {
  dir: join(__dirname, 'routes'),
  dirNameRoutePrefix: false,
});

export default app;
