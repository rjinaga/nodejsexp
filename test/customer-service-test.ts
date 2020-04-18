// eslint-disable-next-line @typescript-eslint/no-unused-vars
import chai from 'chai';
import Customer from '../src/domain/entities/customer';
import CustomerService from '../src/domain/business/customer-service';

const mockRepo = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveData: (customer: Customer): Promise<object> => Promise.resolve({}),
  getCustomers: (): Promise<Customer[]> => Promise.resolve([])
};


describe('Customer Service', function () {
  describe('#Save()', function () {
    
    /** TEST 1 */
    it('should throw an error', async function () {
      // Arrange
      const customer = { name: '', email: 'person@globe.com' };
      const customerService = new CustomerService(mockRepo);

      //Act & Assert
      try {
        await customerService.save(customer);
      } catch (e) {
        chai.expect(e).to.have.property('name');
      }
    });

    /** TEST 2 */
    it('should NOT throw an error', async function () {
      // Arrange
      const customer  = { name: 'person', email: 'person@globe.com' };
      const customerService = new CustomerService(mockRepo);

      //Act & Assert
      await customerService.save(customer);
    });

  });
});

