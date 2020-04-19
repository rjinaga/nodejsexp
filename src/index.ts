require('module-alias/register');
import App from './app';
import dotenv from 'dotenv';

/* Load environment variables into process object */
dotenv.config();

/* Run Web API Service */
const port = +(process.env.APP_PORT || 3000);
new App().run(port);

/** Process Level Unhandled exceptions */