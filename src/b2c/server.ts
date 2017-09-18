/**
 * the polyfills must be the first thing imported
 */
import './polyfills.ts';
import * as path from 'path';
import * as express from 'express';
import * as compression from 'compression';
import * as morgan from 'morgan';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.node.module';
import { environment } from './environments/environment';
import { routes } from './server.routes';

// App

const app  = express();

/**
 * TODO: __dirname issue to be resolved.
 */
const ROOT = path.join('./', '/dist/b2c/');
const port = process.env['PORT'] || 4200;

/**
 * enable prod mode for production environments
 */
if (environment.production) {
  enableProdMode();
}

app.set('views', path.join(ROOT, 'client'));
app.set('view engine', 'html');

/**
 * Attaching logger.
 */
app.use(morgan('combined'));

/**
 * Enable compression
 */
app.use(compression());

/**
 * Express View
 */
app.engine('html', ngExpressEngine({
  bootstrap: AppModule
}));

/**
 * serve static files
 */
app.use('/', express.static(path.join(ROOT, 'client'), {index: false}));

/**
 * bootstrap universal app
 * @param req
 * @param res
 */
function ngApp(req: any, res: any) {
  res.render('index', {
    req,
    res,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: req.hostname
  }, (err: Error, html: string) => {
    res.status(html ? 200 : 500).send(html || err.message);
  });
}

/**
 * use universal for specific routes
 */
app.get('/', ngApp);
routes.forEach(route => {
  app.get(`/${route}`, ngApp);
  app.get(`/${route}/*`, ngApp);
});

/**
 * if you want to use universal for all routes, you can use the '*' wildcard
 */

app.get('*', function (req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  const pojo = {status: 404, message: 'No Content'};
  const json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

app.listen(port, () => {
  console.log(ROOT);
  console.log(`Listening on port ${port}`);
});
