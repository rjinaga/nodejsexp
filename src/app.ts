import express from 'express';
import bodyParser from 'body-parser';
import * as core from 'express-serve-static-core';
import routes, { Method } from './config/routes';
import swaggerDocument from './config/swagger.json';
import swaggerUi from 'swagger-ui-express';

class App {
  private express: core.Express;

  /** Initialize Express Server */
  constructor() {
    this.express = express();
    this.configMiddleware();
  }

  /** Run HTTP Express (App) Server */
  run(port: number): void {
    this.express.listen(port, 'localhost', 100, (err: unknown) => {
      if (err) {
        return console.log(err); // Use loggers to store in files
      }
      return console.log(`server is listening on ${port}`);
    });
  }

  /** Configure middleware for routes, and request handlers */
  private configMiddleware(): void {

    //# Learn Middleware : https://expressjs.com/en/guide/using-middleware.html

    // parse application/x-www-form-urlencoded
    this.express.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    this.express.use(bodyParser.json());

    /** Configure API Routes */
    const router = express.Router();
    this.express.use('/', this.getRoutes(router));


    /** Configure Swagger for API Documentation and Testing */
    if (process.env.APP_ENV == 'development') {
      this.configureSwagger(router);
    }
    
  }

  /** Helper method to load routes from array object */
  private getRoutes(router: core.Router): core.Router {

    /** Set routes to router */
    routes.forEach(route => {
      if (route[0] === Method.GET) {
        router.get(route[1] as string, route[2] as (req: core.Request, res: core.Response) => {});
      }
      else if (route[0] === Method.POST) {
        router.post(route[1] as string, route[2] as (req: core.Request, res: core.Response) => {});
      }
    });
    return router;
  }

  private configureSwagger(router: core.Router): void {
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.express.use('/api', router);
  }

}

export default App;