import * as customerHandler from '@api/customer-handler';
import * as homeHandler from '@api/home-handler';

export enum Method {GET, POST}

//# Learn Routing: https://expressjs.com/en/guide/routing.html
//# Learn Serving static files in Express -> https://expressjs.com/en/starter/static-files.html

const routes = [
    /** Method, Path, Handler */
    [Method.GET, '/', homeHandler.home],
    [Method.GET, '/api/getCustomers', customerHandler.getCustomers],
    [Method.GET, '/api/getStateList', customerHandler.getStateList],
    [Method.POST, '/api/createCustomer', customerHandler.createCustomer],
    [Method.POST, '/api/updateCustomer', customerHandler.updateCustomer]
];

export default routes;