import validate from 'validate.js';
import Customer from '../entities/customer';
import CustomerRepository from '../repositories/customer-repository';
import ICustomerRepository from '../abstracts/abstract-customer-repository';

class CustomerService {

    private customerRepo!: ICustomerRepository;

    constructor(customerRepo?: ICustomerRepository) {
        this.customerRepo = customerRepo ?? new CustomerRepository();
    }

    save(customer: Customer): Promise<object> {

        /*Validate Customer Object*/ 
        const result = validate(customer, {
            name: { presence: { allowEmpty: false } },
            email: { presence: { allowEmpty: false }, email: true }
        });

        /** Reject if any error(s) returned */
        if (result) {
            return Promise.reject(result);
        }

        /** Save data through repository  */
        return this.customerRepo.saveData(customer);
    }

    getCustomers(): Promise<Customer[]> {
        // TODO: validate or run business rules if any
        return this.customerRepo.getCustomers();
    }
}

export default CustomerService;