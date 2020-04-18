import Customer from '../entities/customer';

interface AbstractCustomerRepository {
    saveData(customer: Customer): Promise<object>; 
    getCustomers():  Promise<Customer[]>;
}

export default AbstractCustomerRepository;