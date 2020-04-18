require('module-alias/register');
import app from './app';
import dotenv from 'dotenv';

/* Load environment variables into process object */
dotenv.config();
const port = +(process.env.PORT || 3000);

/* Run Web API Service */
app.run(port);

/** Process Level Unhandled exceptions */