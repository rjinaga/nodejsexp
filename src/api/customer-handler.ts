import * as core from 'express-serve-static-core';
import CustomerService from '../domain/business/customer-service';
import Customer from '../domain/entities/customer';


export const getStateList = (req: core.Request, res: core.Response): void => {
    res.json([
        {code: 'AP', name: 'Andhra Pradesh' },
        {code: 'TS', name: 'Telangana' }
    ]);
};


export const getCustomers =  (req: core.Request, res: core.Response): void => {
    const customerService = new CustomerService ();
    customerService
        .getCustomers()
            .then(data => res.json(data))
            .catch(err => res.send(err.message));
};


export const createCustomer = (req: core.Request, res: core.Response): void => {
    const customerService = new CustomerService();
    customerService
        .save(req.body as Customer)
            .then(() => res.end('succeeded'))
            .catch(err => {
                if (err) {
                    res.status(512);
                }
                res.send(err);
            });
};


export const updateCustomer = (): void => {
        // TODO: 
};

