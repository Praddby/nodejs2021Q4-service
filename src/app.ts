import fastify from 'fastify';
import autoLoad from 'fastify-autoload';
import { join } from 'path';
// import * as swagger from 'fastify-swagger';

const app = fastify({
  logger: true,
});

// app.register(swagger, {
//   exposeRoute: true,
//   routePrefix: '/docs',
//   swagger: {
//     info: { title: 'REST service API' },
//   },
// });

app.register(autoLoad, {
  dir: join(__dirname, 'routes'),
  dirNameRoutePrefix: false,
});

export default app;
