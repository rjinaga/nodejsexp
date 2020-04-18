import getDbContext from '../data-access/db-provider';
import Customer from '../entities/customer';
import AbstractCustomerRepository from '../abstracts/abstract-customer-repository';
import * as common from '../../types/common';

// import sequelize from 'sequelize';

// https://sequelize.org/
// let sql = new sequelize.Sequelize("sqlite:memory");

class CustomerRepository implements AbstractCustomerRepository {

    saveData(customer: Customer): Promise<object> {
        /** THIS IS NOT PRODUCTION CODE, ONLY FOR TESTING */
        const executor = (resolutionFunc: common.ResolvePredicate<Customer[]>, rejectionFunc: common.RejectPredicate<object>): void => {
            const dbContext = getDbContext();
            dbContext
                .open()
                    .then(() => {
                        dbContext
                            .executeCommand(`INSERT INTO customer VALUES ('${customer.name}', '${customer.email}')`)
                                .then (rejectionFunc)   
                                .catch(resolutionFunc)
                                .finally(() => dbContext.close());
                    })
                    .catch(rejectionFunc);    
        };                          
        return new Promise<Customer[]>(executor);
    }

    getCustomers():  Promise<Customer[]>  {
        // /** THIS IS NOT PRODUCTION CODE, ONLY FOR TESTING */
        
        const executor = (resolutionFunc: common.ResolvePredicate<Customer[]>, rejectionFunc: common.RejectPredicate<object>): void => {
            const dbContext = getDbContext();
            dbContext
            .open()
                .then(() => {
                    dbContext
                        .executeQuery<Customer[]>('SELECT * FROM customer')
                            .then(resolutionFunc)
                            .catch(rejectionFunc)
                            .finally(() => dbContext.close());
                })
                .catch(rejectionFunc);    
               
        };
        return new Promise<Customer[]>(executor);
    }
}

export default CustomerRepository;