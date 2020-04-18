import * as customerApi from '@api/customer-api';
import * as homeApi from '@api/home-api';

export enum Method {GET, POST}

const routes = [
    /** Method, Path, Handler */
    [Method.GET, '/', homeApi.home],
    [Method.GET, '/api/getCustomers', customerApi.getCustomers],
    [Method.GET, '/api/getStateList', customerApi.getStateList],
    [Method.POST, '/api/createCustomer', customerApi.createCustomer],
    [Method.POST, '/api/updateCustomer', customerApi.updateCustomer]
];

export default routes;