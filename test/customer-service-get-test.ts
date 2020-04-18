// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as mocha from 'mocha';
import Customer from '../src/domain/entities/customer';
import CustomerService from '../src/domain/business/customer-service';


const mockRepo = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveData: (customer: Customer): Promise<object> => Promise.resolve({}),
  getCustomers: (): Promise<Customer[]> => Promise.resolve([])
};


describe('Customer Service Reads', function () {
  describe('#GetCustomers()', function () {
    
    /** TEST 1 */
    it('should get data', async function () {
      // Arrange
      const customerService = new CustomerService(mockRepo);

      //Act 
      await customerService.getCustomers();
    });

  });
});

